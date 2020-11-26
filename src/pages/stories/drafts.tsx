import React from 'react'
import { useGetAllStoryListByMeQuery } from '../../../generated/graphql'
import Layout from '../../components/Layout'
import StoryListLayout from '../../components/StoryListLayout'
import { toastNotification } from '../../utils/toasters'
import { useIsAuth } from '../../hooks/useIsAuth'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Down } from '../../icons/icons'
import useDeleteStory from '../../hooks/useDeleteStories'
import DropdownTransition, { Anchor } from '../../components/DropdownTransition'
import PopupOKCancel from '../../components/PopupOKCancel'
import styled from 'styled-components'
import StoryListBlock from '../../components/StoryListBlock'

dayjs.extend(relativeTime)

type DraftsProps = {}

const Drafts: React.FC<DraftsProps> = ({}) => {
  useIsAuth()
  const { data: storyList, error: storyError, loading: storyLoading } = useGetAllStoryListByMeQuery({ variables: { isPublished: false } })
  if (storyLoading === false && storyError) {
    toastNotification.error('Failed to load story..')
  }

  const { askRemove, onAskDelete, onCancelRemove, onConfirmRemove } = useDeleteStory()

  let body = null;

  if (storyLoading) {
    body = (
      <div>Loading...</div>
    )
  }
  if (storyList?.getAllStoriesByMe.length! === 0) {
    body = (
      <div>No drafted stories</div>
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
  )
}

export default Drafts
