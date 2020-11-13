import React, { useState } from 'react'
import { useIsAuth } from '../utils/useIsAuth'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { useCreateStoryMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import { debounce } from 'throttle-debounce'

const TextArea = styled.textarea`
  ::placeholder {
    font-size: 1.5rem;
  }
`

type CreateStory = {}

const CreateStory: React.FC<CreateStory> = ({}) => {
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
  })
  const { title, content } = inputs
  const [createStory, { loading, data }] = useCreateStoryMutation()
  const router = useRouter()
  useIsAuth()

  const saveTempStory = debounce(5000, ({ title = '', content = '' }: { title?: string; content?: string }) => {
    createStory({
      variables: { title: title!, content: content!, isPublished: false },
      update: (cache) => {
        cache.evict({})
      },
    }).then((res) => {
      const storyId = res.data?.createStory.id
      router.replace('/stories/edit/' + storyId)
    })
  })

  const handlePublish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title || content) {
      createStory({
        variables: { title, content, isPublished: true },
        update: (cache) => {
          cache.evict({})
        },
      })
      router.push('/stories/drafts')
    }
  }

  const handleTitleTempStory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setInputs({
      ...inputs,
      [name]: value,
    })
    if (title.length === 5) {
      saveTempStory({ title })
    }
  }

  const handleContentTempStory = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setInputs({
      ...inputs,
      [name]: value,
    })
    if (content.length === 5) {
      saveTempStory({ content })
    }
  }

  return (
    <Layout>
      <form className='px-56' onSubmit={handlePublish}>
        <div className='flex mb-4'>
          <button type='submit' className='bg-green-600 hover:bg-green-700 text-white text-sm px-2 py-1 rounded block mr-3'>
            Publish
          </button>
          {loading && <span>Loading..</span>}
          {!loading && data && <span>Saved</span>}
        </div>
        <input type='text' name='title' className='pl-4 h-16 w-1/2 text-3xl border-l border-gray-600 focus:outline-none placeholder-gray-500' placeholder='Title' value={title} onChange={handleTitleTempStory} />
        <TextArea value={content} name='content' className='p-2 text-2xl focus:outline-none' onChange={handleContentTempStory} placeholder='Tell your story...' rows={40} cols={64} />
      </form>
    </Layout>
  )
}

export default CreateStory
