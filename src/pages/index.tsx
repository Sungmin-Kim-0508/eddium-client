import { useState, useRef, useCallback } from 'react'
import { useGetAllStoriesForHomePageQuery } from '../../generated/graphql';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '../components/Layout'
import Link from 'next/link';
import Image from 'next/image'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"
import useStorySearch from '../hooks/useStorySearch';
dayjs.extend(relativeTime)

export default function IndexPage() {
  const { data, loading, error } = useGetAllStoriesForHomePageQuery()
  const observer = useRef<HTMLDivElement>()
  const [pageNumber, setPageNumber] = useState(1)
  
  // const { data: dt, loading: lad, error: err, hasMore } = useStorySearch(pageNumber)
  
  // const lastStoryElementRef = useCallback((node : HTMLDivElement | null) => {
  //   if (loading) return
  //   if (observer.current) observer?.current
  // }, [])
  if (loading) return (
    <div>Loading...</div>
  );
  if (error) return `Error! ${error.message}`;
  // const { id, title, content, view, createdAt, thumbnail_image_url } = dt?.getAllStoriesWithPagination.stories[0]!
  const { id, title, content, view, createdAt, thumbnail_image_url } = data?.getAllStories[0]!
  const storiesUrl = '/stories'
  return (
    <Layout>
      <div className="px-10">
        <div className="grid grid-cols-2">
          <div className="flex-col">
            <img className="mb-3" src={thumbnail_image_url} alt={title} />
            <div>
              <Link href={storiesUrl + '/' + id}>
                <a className="text-mediumContent text-2xl font-semibold block">{title}</a>
              </Link>
              <Link href={storiesUrl + '/' + id}>
                <a className="text-base">{content.substring(0, 200)}</a>
              </Link>
            </div>
            <div className="text-mediumGray text-sm">
              <span className="mr-4">{dayjs(parseInt(createdAt)).fromNow()}</span>
              <span>{view} views</span>
            </div>
          </div>
          <div className="p-3">
            {/* {dt?.getAllStoriesWithPagination.stories.map((story, index) => ( */}
            {data?.getAllStories.map((story, index) => (
              (index > 0 && index < 5) && (
                <div key={story.id} className="flex mb-4">
                  <div className="flex-auto flex-col ">
                    <Link href={storiesUrl + '/' + story.id}>
                      <a className="text-mediumContent text-lg font-semibold block">{story.title}</a>
                    </Link>
                    <div className="text-mediumGray text-sm">
                      <span className="mr-4">{dayjs(parseInt(story.createdAt)).fromNow()}</span>
                      <span>{story.view} views</span>
                    </div>
                  </div>
                  <Link href={storiesUrl + '/' + story.id}>
                    <a>
                      <Image className="flex-auto" src={story.thumbnail_image_url} alt={story.title} width={100} height={100} />
                    </a>
                  </Link>
                </div>
              )
            ))}
          </div>
          </div>
          <hr className="mb-6" />
          <div>
            {data?.getAllStories.map((story) => (
              <div key={story.id} className="flex mb-4">
                <div className="flex-auto flex-col w-3/4 mr-4">
                  <Link href={storiesUrl + '/' + story.id}>
                    <a className="text-mediumContent text-2xl font-semibold block">{story.title}</a>
                  </Link>
                  <div className="text-mediumContent">
                    {story.content.substring(0, 250)}...
                  </div>
                  <div className="text-mediumGray text-sm">
                    <span className="mr-4">{dayjs(parseInt(story.createdAt)).fromNow()}</span>
                    <span className="mr-4">{story.view} views</span>
                    <span>{story.user?.firstName} {story.user?.lastName}</span>
                  </div>
                </div>
                <Link href={storiesUrl + '/' + story.id}>
                  <a>
                    {story.thumbnail_image_url ? (
                      <Image className="flex-auto w-1/4" src={story.thumbnail_image_url} alt={story.title} width={200} height={200} />
                    ) : null}
                  </a>
                </Link>
              </div>
            ))}
          </div>
      </div>
      </Layout>
  )
}
