import React from 'react'
import { useGetAllStoryListByMeQuery } from '../../../generated/graphql'
import Layout from '../../components/Layout'
import StoryListLayout from "../../components/StoryListLayout"
import { toastNotification } from '../../utils/toasters'
import { useIsAuth } from '../../utils/useIsAuth'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import { Down } from '../../icons/icons'
import DropdownTransition, { Anchor } from "../../components/DropdownTransition"
import Link from 'next/link'

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
            <Link href="/stories/[id]" as={`/stories/${story.id}`}>
              <a>{story.title}</a>
            </Link>
            <p>{story.content}</p>
            <div className="flex">
              <span className="mr-3">
                Created At {dayjs(story.createdAt).fromNow()} 
              </span>
              <div className="relative">
                <DropdownTransition BtnFigure={() => <Down />}>
                  <Anchor href="/stories/edit/[id]" as={`/stories/edit/${story.id}`}>Edit Story</Anchor>
                </DropdownTransition>
              </div>
            </div>
          </div>
        ))}
      </StoryListLayout>
    </Layout>
  );
}

export default Drafts