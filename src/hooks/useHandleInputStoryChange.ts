import { useState, useEffect } from 'react'
import { useGetStoryByStoryIdQuery } from '../../generated/graphql'
import { NextRouter, useRouter } from 'next/router'
import { compareObjectDeeply } from '../utils/compareObjectDeeply'
import useRequests from './useRequests'

type Params = {
  router?: NextRouter
}

type ReturnType = {
  inputs: {
    title: string,
    content: string,
    imgUrl: string
  };
  storyLoading?: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const useHandleInputStoryChange = ({} : Params) : ReturnType => {
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    imgUrl: '',
  })
  const { title, content, imgUrl } = inputs
  const router = useRouter()
  const { id } = router.query

  const { data: storyData, loading: storyLoading } = useGetStoryByStoryIdQuery({
    variables: { id: id as string }
  })
  const { handleCreateStory, handleUpdateStory } = useRequests()

  let lastInputs = {
    title: '',
    content: ''
  }

  useEffect(() => {
    const dataFromServer = {
      title: storyData?.getStoryBy.title!,
      content: storyData?.getStoryBy.content!,
      imgUrl: storyData?.getStoryBy.thumbnail_image_url!
    }
    lastInputs = dataFromServer
    setInputs(dataFromServer)
  }, [storyLoading])

  // Auto save
  useEffect(() => {
    const changed = !compareObjectDeeply(lastInputs, inputs)
    if (changed) {
      const timeoutId = setTimeout(() => {
        if (id) {
          handleUpdateStory(id as string, title, content, false, imgUrl)
        } else {
          handleCreateStory(title, content, false, imgUrl)
        }
      }, 10 * 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [inputs])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const inputChanger = {
    inputs,
    handleInputChange
  }

  return {
    ...inputChanger,
    storyLoading
  }
}

export default useHandleInputStoryChange