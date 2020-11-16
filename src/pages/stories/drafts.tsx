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

dayjs.extend(relativeTime)

type DraftsProps = {}

const Drafts: React.FC<DraftsProps> = ({}) => {
  useIsAuth()
  const { data: storyList, error: storyError, loading: storyLoading } = useGetAllStoryListByMeQuery({ variables: { isPublished: false } })
  if (storyLoading === false && storyError) {
    toastNotification.error('Failed to load story..')
  }

  const { askRemove, onAskDelete, onCancelRemove, onConfirmRemove } = useDeleteStory()

  return (
    <Layout>
      <StoryListLayout>
        {storyLoading && <div>Loading...</div>}
        {!storyLoading &&
          storyList?.getAllStoriesByMe.map((story) => (
            <div key={story.id} className='py-4 border-b-2'>
              <a>{story.title}</a>
              <p>{story.content}</p>
              <div className='flex'>
                <span className='mr-3'>Created At {dayjs(parseInt(story.createdAt)).fromNow()}</span>
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
          ))}
          <PopupOKCancel title="Delete story" confirmLabel="Delete" visible={askRemove} onCancel={onCancelRemove} onConfirm={onConfirmRemove}>
            Are you sure you want to delete this story?
          </PopupOKCancel>
      </StoryListLayout>
    </Layout>
  )
}

export default Drafts
