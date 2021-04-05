import { useRouter } from 'next/router'
import { useCreateStoryMutation, useUpdateStoryMutation } from "../../generated/graphql"
import { toastNotification } from '../utils/toasters'

const useRequests = () => {
  const router = useRouter()
  const [createStory, createStoryResponse] = useCreateStoryMutation()
  const [updateStory, updateStoryResponse] = useUpdateStoryMutation()

  const handleCreateStory = async (title: string, content: string, isPublished: boolean, imgUrl?: string) => {
    return await createStory({
      variables: { title, content, isPublished, imgUrl },
      update: (cache) => {
        cache.evict({})
      },
    })
    .then(res => {
      if (!isPublished) {
        const storyId = res.data?.createStory.id;
        router?.replace('/stories/edit/' + storyId)
        toastNotification.success('Your story has saved! 👍')
      } else {
        router?.replace('/stories/drafts')
        toastNotification.success('Successfully Publish! 👏')
      }
    })
  }

  const handleUpdateStory = async (id: string, title: string, content: string, isPublished: boolean, imgUrl?: string) => {
    return await updateStory({
      variables: { id: id, title, content, isPublished, imgUrl },
      update: (cache) => {
        cache.evict({})
      },
    })
  }

  const handlePublishStory = async (title: string, content: string, isPublished: boolean, imgUrl?: string, storyId?: string) => {
    if (storyId) {
      await handleUpdateStory(storyId as string, title, content, isPublished, imgUrl)
    } else {
      await handleCreateStory(title, content, isPublished, imgUrl)
    }
  }

  return {
    handleCreateStory,
    createStoryResponse,
    handleUpdateStory,
    updateStoryResponse,
    handlePublishStory
  }
}

export default useRequests