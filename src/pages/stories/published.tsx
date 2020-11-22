import React from 'react'
import { useGetAllStoryListByMeQuery } from '../../../generated/graphql'
import Layout from '../../components/Layout'
import StoryListLayout from "../../components/StoryListLayout"
import useDeleteStory from '../../hooks/useDeleteStories'
import { toastNotification } from '../../utils/toasters'
import { useIsAuth } from '../../hooks/useIsAuth'
import DropdownTransition, { Anchor } from '../../components/DropdownTransition'
import { Down } from '../../icons/icons'
import PopupOKCancel from '../../components/PopupOKCancel'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

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
      storyList?.getAllStoriesByMe.map((story) => (
        <div key={story.id} className='py-4 border-b-2'>
          <a className="font-bold text-mediumBlack">{story.title}</a>
          <p className="text-mediumGray">{story.content}</p>
          <div className='flex'>
            <span className='mr-3 text-mediumGray'>Created At {dayjs(parseInt(story.createdAt)).fromNow()}</span>
            <div className='relative'>
              <DropdownTransition BtnFigure={() => <Down />}>
                <Anchor href='/stories/edit/[id]' as={`/stories/edit/${story.id}`}>
                  Edit Story
                </Anchor>
                <button className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => onAskDelete(story.id)}>
                  Delete Story
                </button>
              </DropdownTransition>
            </div>
          </div>
        </div>
      ))
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