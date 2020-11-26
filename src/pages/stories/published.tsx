import React from 'react'
import { useGetAllStoryListByMeQuery } from '../../../generated/graphql'
import Layout from '../../components/Layout'
import StoryListLayout from "../../components/StoryListLayout"
import useDeleteStory from '../../hooks/useDeleteStories'
import { toastNotification } from '../../utils/toasters'
import { useIsAuth } from '../../hooks/useIsAuth'
import PopupOKCancel from '../../components/PopupOKCancel'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import StoryListBlock from '../../components/StoryListBlock'

dayjs.extend(relativeTime)

type PublishedProps = {

}

const Published: React.FC<PublishedProps> = ({}) => {
  useIsAuth()

  const { data: storyList, error: storyError, loading: storyLoading }
    = useGetAllStoryListByMeQuery({ variables: { isPublished: true }})
  if (storyLoading === false && storyError) {
    toastNotification.error('Failed to load story..')
  }

  const { askRemove, onAskDelete, onCancelRemove, onConfirmRemove } = useDeleteStory()

  let body = null
  if (storyLoading) {
    body = (
      <div>Loading...</div>
    )
  }
  if (storyList?.getAllStoriesByMe.length! === 0) {
    body = (
      <div>No published stories</div>
    )
  }
  if (storyList?.getAllStoriesByMe.length! > 0) {
    body = (
      <StoryListBlock data={storyList?.getAllStoriesByMe} onAskDelete={onAskDelete} />
    )
  }


  return (
    <Layout>
      <StoryListLayout>
        {body}
        <PopupOKCancel title="Delete story" confirmLabel="Delete" visible={askRemove} onCancel={onCancelRemove} onConfirm={onConfirmRemove}>
          Are you sure you want to delete this story?
        </PopupOKCancel>
      </StoryListLayout>
    </Layout>
  );
}

export default Published