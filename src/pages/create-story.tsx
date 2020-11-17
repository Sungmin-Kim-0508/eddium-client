import React from 'react'
import { useIsAuth } from '../hooks/useIsAuth'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { toastNotification } from '../utils/toasters'
import useHandleInputStoryChange from '../hooks/useHandleInputStoryChange'

const TextArea = styled.textarea`
  ::placeholder {
    font-size: 1.5rem;
  }
`

type CreateStory = {}

const CreateStory: React.FC<CreateStory> = ({}) => {
  useIsAuth()

  const { inputs, handleInputChange, handleCreateStory, createStoryResponse } = useHandleInputStoryChange({ id: null })
  const { title, content } = inputs
  const { loading, data } = createStoryResponse
  const router = useRouter()

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!title || content.length < 30) {
      toastNotification.error('Please enter title and story please 😉')
      return;
    }
    await handleCreateStory(false)
  }

  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || content.length < 30) {
      toastNotification.error('Please enter title and story please 😉')
      return;
    }
    else {
      await handleCreateStory(true)
      router.push('/stories/drafts')
    }
  }

  return (
    <Layout>
      <form className='px-56' onSubmit={handlePublish}>
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
        <input type='text' name='title' className='pl-4 h-16 w-1/2 text-3xl border-l border-gray-600 focus:outline-none placeholder-gray-500' placeholder='Title' value={title} onChange={handleInputChange} />
        <TextArea value={content} name='content' className='p-2 text-2xl focus:outline-none' onChange={handleInputChange} placeholder='Tell your story...' rows={40} cols={64} />
      </form>
    </Layout>
  )
}

export default CreateStory
