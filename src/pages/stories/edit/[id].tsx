import React, { useState, useEffect } from 'react'
import { useIsAuth } from '../../../hooks/useIsAuth'
import Layout from '../../../components/Layout'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useGetStoryByStoryIdQuery, useUpdateStoryMutation } from '../../../../generated/graphql'
import { Helmet } from 'react-helmet-async'

const TextArea = styled.textarea`
  ::placeholder {
    font-size: 1.5rem;
  }
`

type EditStory = {}

const EditStory: React.FC<EditStory> = ({}) => {
  useIsAuth()

  const router = useRouter()
  const { id } = router.query

  const [inputs, setInputs] = useState({
    title: '',
    content: '',
  })
  const { title, content } = inputs
  const { data: storyData, loading: storyLoading } = useGetStoryByStoryIdQuery({ variables: { id: id as string } })
  const [updateStory, { loading, data }] = useUpdateStoryMutation()

  useEffect(() => {
    setInputs({
      title: storyData?.getStoryBy.title!,
      content: storyData?.getStoryBy.content!,
    })
  }, [storyLoading])

  const handlePublish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    updateStory({
      variables: { id: id as string, title, content, isPublished: true },
      update: (cache) => {
        cache.evict({})
      },
    })
    router.push('/stories/' + id)
  }

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    updateStory({
      variables: { id: id as string, title, content, isPublished: false },
      update: (cache) => {
        cache.evict({})
      },
    })
  }

  const handleTitleTempStory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const handleContentTempStory = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  if (storyLoading && !data) {
    return <Layout>Loading...</Layout>
  }

  return (
    <>
      <Helmet>
        <title>{title ? `Writing about ${title}` : `Writing my story`}</title>
      </Helmet>
      <Layout>
        <form className='lg:px-56' onSubmit={handlePublish}>
          <div className='flex mb-4'>
            <button type='button' className='bg-gray-600 hover:bg-gray-700 text-white text-sm px-2 py-1 rounded block mr-3' onClick={handleSave}>
              Save
            </button>
            <button type='submit' className='bg-green-600 hover:bg-green-700 text-white text-sm px-2 py-1 rounded block mr-3'>
              Publish
            </button>
            {loading && <span>Loading..</span>}
            {!loading && data && <span>Saved</span>}
          </div>
          <input type='text' name='title' className='pl-4 h-16 w-1/2 text-3xl border-l border-gray-600 focus:outline-none placeholder-gray-500' placeholder='Title' defaultValue={title} onChange={handleTitleTempStory} />
          <TextArea name='content' defaultValue={content} className='p-2 text-2xl focus:outline-none' onChange={handleContentTempStory} placeholder='Tell your story...' rows={40} cols={64} />
        </form>
      </Layout>
    </>
  )
}

export default EditStory
