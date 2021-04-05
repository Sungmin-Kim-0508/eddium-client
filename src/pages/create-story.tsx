import React, { useState } from 'react'
import { useIsAuth } from '../hooks/useIsAuth'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { toastNotification } from '../utils/toasters'
import useStoryPreview from '../hooks/useStoryPreview'
import useHandleInputStoryChange, { DefaultStateType } from '../hooks/useHandleInputStoryChange'
import StoryPreview from '../components/StoryPreview'
import { PublishBtn } from '../components/Buttons'
import useRequests from '../hooks/useRequests'

const TextArea = styled.textarea`
  ::placeholder {
    font-size: 1.5rem;
  }
`

type CreateStory = {}

const CreateStory: React.FC<CreateStory> = ({}) => {
  useIsAuth()

  const { inputs, handleInputChange } = useHandleInputStoryChange()
  const { previewMode, onTogglePreviewMode } = useStoryPreview()
  const { handleCreateStory, createStoryResponse } = useRequests()

  const { title, content, isPublished } = inputs
  const { loading, data } = createStoryResponse

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    await handleCreateStory(title, content, false)
  }

  const handlePublish = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!title) {
      toastNotification.error('Please enter title please 😉')
      return;
    }
    if (content.length < 30) {
      toastNotification.error('Could you please enter more than 30 words on your story? 😉')
      return;
    }
    onTogglePreviewMode()
  }

  return (
    <Layout>
      <form className='px-56'>
        <div className='flex mb-4'>
            <button type='button' className='bg-gray-600 hover:bg-gray-700 text-white text-sm px-2 py-1 rounded block mr-3' onClick={handleSave}>
              Save
            </button>
          <PublishBtn type="button" onClick={handlePublish}>
            Publish
          </PublishBtn>
          {loading && <span>Loading..</span>}
          {!loading && data && <span>Saved</span>}
        </div>
        <input type='text' name='title' className='pl-4 h-16 w-full text-3xl border-l border-gray-600 focus:outline-none placeholder-gray-500' placeholder='Title' value={title} onChange={handleInputChange} />
        <TextArea value={content} name='content' className='p-2 text-2xl focus:outline-none' onChange={handleInputChange} placeholder='Tell your story...' rows={40} cols={64} />
      </form>
      <StoryPreview visible={previewMode} title={title} content={content}  onTogglePreviewMode={onTogglePreviewMode} />
    </Layout>
  )
}

export default CreateStory
