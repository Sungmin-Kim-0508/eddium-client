import { useState, useEffect } from 'react'
import { useGetStoryByStoryIdQuery } from '../../generated/graphql'
import { useRouter } from 'next/router'
import { compareObjectDeeply } from '../utils/compareObjectDeeply'
import useRequests from './useRequests'

export type DefaultStateType = {
  title: string;
  content: string;
  imgUrl: string;
  isPublished: boolean;
}

type ReturnType = {
  inputs: DefaultStateType;
  storyLoading?: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const useHandleInputStoryChange = () : ReturnType => {
  const [inputs, setInputs] = useState<DefaultStateType>({
    title: '',
    content: '',
    imgUrl: '',
    isPublished: false
  })
  const { title, content, imgUrl, isPublished } = inputs
  const router = useRouter()
  const { id } = router.query

  const { data: storyData, loading: storyLoading } = useGetStoryByStoryIdQuery({
    variables: { id: id as string }
  })
  const { handleCreateStory, handleUpdateStory } = useRequests()

  let lastInputs: DefaultStateType = {
    title: '',
    content: '',
    imgUrl: '',
    isPublished: false
  }

  // Change state after data comes from server
  useEffect(() => {
    // States are changed ONLY when edit-page is rendered -> This case should be when router.query.id is given
    if (id) {
      const dataFromServer: DefaultStateType = {
        title: storyData?.getStoryBy.title!,
        content: storyData?.getStoryBy.content!,
        imgUrl: storyData?.getStoryBy.thumbnail_image_url!,
        isPublished: storyData?.getStoryBy.isPublished!
      }
      lastInputs = dataFromServer
      setInputs(dataFromServer)
    }
  }, [storyLoading])

  // Auto save
  useEffect(() => {
    const changed = !compareObjectDeeply(lastInputs, inputs)
    if (changed) {
      const timeoutId = setTimeout(() => {
        if (id) {
          handleUpdateStory(id as string, title, content, isPublished, imgUrl)
        } else {
          handleCreateStory(title, content, isPublished, imgUrl)
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