import React from 'react'
import { useGetAllStoryListByMeQuery } from '../../../generated/graphql'
import Layout from '../../components/Layout'
import StoryListLayout from "../../components/StoryListLayout"
import { toastNotification } from '../../utils/toasters'
import { useIsAuth } from '../../utils/useIsAuth'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

type DraftsProps = {

}

const Drafts: React.FC<DraftsProps> = ({}) => {
  useIsAuth()

  const { data: storyList, error: storyError, loading: storyLoading } = useGetAllStoryListByMeQuery({ variables: { isPublished: false } })
  if (storyLoading === false && storyError) {
    toastNotification.error('Failed to load story..')
  }

  return (
    <Layout>
      <StoryListLayout>
        {storyLoading && <div>Loading...</div>}
        {!storyLoading && storyList?.getAllStoriesByMe.map(story => (
          <div key={story.id} className="py-4 border-b-2">
            <span>{story.title}</span>
            <p>{story.content}</p>
            Created At {dayjs(story.createdAt).fromNow()}
          </div>
        ))}
      </StoryListLayout>
    </Layout>
  );
}

export default Drafts