import React from 'react'
import { useIsAuth } from '../../../hooks/useIsAuth'
import Layout from '../../../components/Layout'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Helmet } from 'react-helmet-async'
import useHandleInputStoryChange from '../../../hooks/useHandleInputStoryChange'
import { toastNotification } from '../../../utils/toasters'

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

  const { inputs,storyLoading, updateStoryResponse, handleUpdateStory, handleInputChange, } = useHandleInputStoryChange({ id: id as string })

  const { title, content } = inputs

  const { loading, data } = updateStoryResponse

  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleUpdateStory(true)
    router.push('/stories/' + id)
  }

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!title || content.length < 30) {
      toastNotification.error('Please enter title and story please 😉')
      return;
    }
    await handleUpdateStory(false)
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
          <input type='text' name='title' className='pl-4 h-16 w-1/2 text-3xl border-l border-gray-600 focus:outline-none placeholder-gray-500' placeholder='Title' defaultValue={title} onChange={handleInputChange} />
          <TextArea name='content' defaultValue={content} className='p-2 text-2xl focus:outline-none' onChange={handleInputChange} placeholder='Tell your story...' rows={40} cols={64} />
        </form>
      </Layout>
    </>
  )
}

export default EditStory
