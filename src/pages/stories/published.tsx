import React from 'react'
import { useGetAllStoryListByMeQuery } from '../../../generated/graphql'
import Layout from '../../components/Layout'
import StoryListLayout from "../../components/StoryListLayout"
import { useMeQuery } from '../../generated/graphql'
import { toastNotification } from '../../utils/toasters'
import { useIsAuth } from '../../utils/useIsAuth'

type PublishedProps = {

}

const Published: React.FC<PublishedProps> = ({}) => {
  useIsAuth()

  const { data: storyList, error: storyError, loading: storyLoading }
    = useGetAllStoryListByMeQuery({ variables: { isPublished: true }})
  if (storyLoading === false && storyError) {
    toastNotification.error('Failed to load story..')
  }

  return (
    <Layout>
      <StoryListLayout>
        {storyList?.getAllStoriesByMe.map(story => (
          <div key={story.id} className="py-4 border-b-2">
            <span>{story.title}</span>
            <p>{story.content}</p>
          </div>
        ))}
      </StoryListLayout>
    </Layout>
  );
}

export default Published