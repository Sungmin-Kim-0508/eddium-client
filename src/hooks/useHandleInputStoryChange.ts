import { useState, useCallback, useEffect } from 'react'
import { useGetStoryByStoryIdQuery, useUpdateStoryMutation, useCreateStoryMutation, CreateStoryMutation, UpdateStoryMutation } from '../../generated/graphql'
import { useRouter } from 'next/router'
import { compareObjectDeeply } from '../utils/compareObjectDeeply'
import { toastNotification } from '../utils/toasters'
import { MutationResult } from '@apollo/client/react/types/types'
import { FetchResult } from '@apollo/client/link/core/types'

type Params = {
  id?: string | null;
}

type ReturnType = {
  inputs: {
    title: string,
    content: string
  };
  storyLoading?: boolean;
  handleCreateStory: (isPublished: boolean) => Promise<void>
  handleUpdateStory: (isPublished: boolean) => Promise<FetchResult<UpdateStoryMutation, Record<string, any>, Record<string, any>>>
  createStoryResponse: MutationResult<CreateStoryMutation>;
  updateStoryResponse: MutationResult<UpdateStoryMutation>
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const useHandleInputStoryChange = ({ id } : Params) : ReturnType => {
  const router = useRouter()
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
  })

  const [createStory, createStoryResponse] = useCreateStoryMutation()
  const [updateStory, updateStoryResponse] = useUpdateStoryMutation()

  const { title, content } = inputs


  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setInputs({
      ...inputs,
      [name]: value,
    })
  }, [inputs])

  const handleUpdateStory = async (isPublished: boolean) => {
    return await updateStory({
      variables: { id: id as string, title, content, isPublished },
      update: (cache) => {
        cache.evict({})
      },
    })
  }

  const handleCreateStory = async (isPublished: boolean) => {
    return await createStory({
      variables: { title, content, isPublished },
      update: (cache) => {
        cache.evict({})
      },
    })
    .then(res => {
      if (!isPublished) {
        const storyId = res.data?.createStory.id;
        router.replace('/stories/edit/' + storyId)
      }
    })
  }

  const draftOrPublishStory = useCallback(
    async (isPublished: boolean) => {
      if (!title || content.length < 30) {
        toastNotification.error('Please enter title and story please 😉')
        return;
      }
      if (id) {
        await handleUpdateStory(isPublished)
      } else {
        await handleCreateStory(isPublished)
      }

      if (isPublished) {
        router.push('/stories/drafts')
      }
    }, [title, content])

  const inputChanger = {
    inputs,
    createStoryResponse,
    updateStoryResponse,
    handleCreateStory,
    handleUpdateStory,
    handleInputChange
  }

  let lastInputs = {
    title: '',
    content: ''
  }

  if (!!id) {
    const { data: storyData, loading: storyLoading } = useGetStoryByStoryIdQuery({ variables: { id }})
  
    useEffect(() => {
      const dataFromServer = {
        title: storyData?.getStoryBy.title!,
        content: storyData?.getStoryBy.content!
      }
      lastInputs = dataFromServer
      setInputs(dataFromServer)
    }, [storyLoading])
    return {
      ...inputChanger,
      storyLoading
    }
  }

  useEffect(() => {
    const changed = !compareObjectDeeply(lastInputs, inputs)
    if (changed) {
      const timeoutId = setTimeout(() => {
        draftOrPublishStory(false)
      }, 10 * 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [title, content])

  return inputChanger
}

export default useHandleInputStoryChange