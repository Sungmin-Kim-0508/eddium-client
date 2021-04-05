import { useState, useCallback } from 'react'
import { useDeleteStoryMutation } from '../../generated/graphql';
import { toastNotification } from '../utils/toasters';

const useDraftedStories = () => {
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [deleteStory] = useDeleteStoryMutation();

  const onAskDelete = useCallback((id: string) => {
    setDeleteId(id)
  }, [])

  const onCancelRemove = useCallback(() => {
    setDeleteId(null);
  }, [])

  const onConfirmRemove = useCallback(async () => {
    if (deleteId) {
      const { data, errors } = await deleteStory({
        variables: { id: deleteId },
        update: (cache) => {
          cache.evict({ id: deleteId })
        }
      })
      
      if (data?.deleteStory.isDelete) {
        toastNotification.success(data?.deleteStory.msg)
      } else if (!data?.deleteStory.isDelete) {
        toastNotification.error(data?.deleteStory.msg!)
      } else if (errors) {
        toastNotification.error('Server Error...')
      }
      setDeleteId(null)
    }
  }, [deleteStory, deleteId])

  return {
    askRemove: !!deleteId,
    onAskDelete,
    onCancelRemove,
    onConfirmRemove
  }
}
export default useDraftedStories