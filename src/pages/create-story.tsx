import React, { useState } from 'react'
import { useIsAuth } from '../utils/useIsAuth';
import Layout from "../components/Layout"
import styled from 'styled-components'
import { GetAllStoriesForHomePageDocument, GetAllStoriesForHomePageQuery, Story, useCreateStoryMutation, useGetAllStoriesForHomePageQuery } from '../generated/graphql';
import { useRouter } from 'next/router'

const TextArea = styled.textarea`
  ::placeholder {
    font-size: 1.5rem;
  }
`

type CreateStory = {

}

const CreateStory: React.FC<CreateStory> = ({}) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [createStory] = useCreateStoryMutation()
  const router = useRouter()
  useIsAuth()

  const handlePublish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title || content) {
      createStory({
        variables: {title, content, isPublished: true },
        update: (cache) => {
          cache.evict({})
        }
      })
      router.push('/')
    }
  }
  return (
    <Layout>
      <form className="px-56" onSubmit={handlePublish}>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block">
          Publish
        </button>
        <input type="text" className="pl-4 h-16 w-1/2 mt-4 mb-4 text-3xl border-l border-gray-600 focus:outline-none placeholder-gray-500" placeholder="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        <TextArea value={content} className="p-2 text-2xl focus:outline-none" onChange={(e) => setContent(e.currentTarget.value)} placeholder="Tell your story..." rows={40} cols={64} />
      </form>
    </Layout>
  );
}

export default CreateStory