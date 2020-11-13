import React, { useState, useEffect } from 'react'
import { useIsAuth } from '../../../utils/useIsAuth';
import Layout from "../../../components/Layout"
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { debounce } from "throttle-debounce"
import { useUpdateStoryMutation } from '../../../../generated/graphql';

const TextArea = styled.textarea`
  ::placeholder {
    font-size: 1.5rem;
  }
`

type EditStory = {

}

const EditStory: React.FC<EditStory> = ({}) => {
  useIsAuth()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [updateStory, { loading, data }] = useUpdateStoryMutation()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    return () => {
      // update story
      saveTempStory({ title, content })
    }
  }, [])

  const saveTempStory = debounce(5000, ({ title = '', content = '' } : { title?: string, content?: string }) => {
    updateStory({
      variables: {id: id as string, title: title!, content: content!, isPublished: false },
      update: (cache) => {
        cache.evict({})
      }
    })
  })

  const handlePublish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title || content) {
      updateStory({
        variables: {id: id as string, title, content, isPublished: true },
        update: (cache) => {
          cache.evict({})
        }
      })
      router.push('/')
    }
  }

  const handleTitleTempStory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    if (title.length === 5) {
      saveTempStory({ title })
    }
  }

  const handleContentTempStory = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value)
    if (content.length === 5) {
      saveTempStory({ content })
    }
  }
  
  return (
    <Layout>
      <form className="px-56" onSubmit={handlePublish}>
        <div className="flex mb-4">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white text-sm px-2 py-1 rounded block mr-3">
            Publish
          </button>
          {loading && <span>Loading..</span>}
          {!loading && data && <span>Saved</span>}
        </div>
        <input type="text" className="pl-4 h-16 w-1/2 text-3xl border-l border-gray-600 focus:outline-none placeholder-gray-500" placeholder="Title" value={title} onChange={handleTitleTempStory} />
        <TextArea value={content} className="p-2 text-2xl focus:outline-none" onChange={handleContentTempStory} placeholder="Tell your story..." rows={40} cols={64} />
      </form>
    </Layout>
  );
}

export default EditStory