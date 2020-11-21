import { useRouter } from 'next/router'
import { useCreateStoryMutation, useUpdateStoryMutation } from "../../generated/graphql"

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
      } else {
        router?.replace('/stories/drafts')
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

  return {
    handleCreateStory,
    createStoryResponse,
    handleUpdateStory,
    updateStoryResponse,
  }
}

export default useRequests