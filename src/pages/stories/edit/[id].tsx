import React from 'react'
import { useIsAuth } from '../../../hooks/useIsAuth'
import Layout from '../../../components/Layout'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Helmet } from 'react-helmet-async'
import useHandleInputStoryChange from '../../../hooks/useHandleInputStoryChange'
import { toastNotification } from '../../../utils/toasters'
import useStoryPreview from '../../../hooks/useStoryPreview'
import StoryPreview from '../../../components/StoryPreview'
import useRequests from '../../../hooks/useRequests'

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

  const { inputs, storyLoading, handleInputChange } = useHandleInputStoryChange()
  const { previewMode, onTogglePreviewMode } = useStoryPreview()
  const { handleUpdateStory, updateStoryResponse } = useRequests()

  const { title, content, imgUrl, isPublished } = inputs

  const { loading, data } = updateStoryResponse

  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    await handleUpdateStory(id as string, title, content, isPublished, imgUrl)
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
          <input type='text' name='title' className='pl-4 h-16 w-full text-3xl border-l border-gray-600 focus:outline-none placeholder-gray-500' placeholder='Title' defaultValue={title} onChange={handleInputChange} />
          <TextArea name='content' defaultValue={content} className='p-2 text-2xl focus:outline-none' onChange={handleInputChange} placeholder='Tell your story...' rows={40} cols={64} />
        </form>
      </Layout>
      <StoryPreview visible={previewMode} title={title} content={content} imgUrl={imgUrl} onTogglePreviewMode={onTogglePreviewMode} />
    </>
  )
}

export default EditStory
