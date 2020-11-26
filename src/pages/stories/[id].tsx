import React from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head'
import { useIsAuth } from '../../hooks/useIsAuth'
import { useRouter } from 'next/router'
import { useGetStoryByStoryIdQuery } from '../../../generated/graphql'
import { Bookmarked, Clap, FacebookSmall, TwitterSmall } from '../../icons/icons'
import Image from 'next/image'
import dayjs from 'dayjs'

type StoryDetailProps = {}

const StoryDetail: React.FC<StoryDetailProps> = ({}) => {
  useIsAuth()

  const router = useRouter()
  const { id } = router.query
  const { data: storyData, loading: storyLoading } = useGetStoryByStoryIdQuery({ variables: { id: id as string } })

  if (storyLoading && !storyData) {
    return <Layout>Loading...</Layout>
  }

  const { title, content, clap, createdAt, user, thumbnail_image_url } = storyData?.getStoryBy!

  return (
    <>
      <Head>
        <title>{storyData?.getStoryBy.title}</title>
      </Head>
      <Layout>
        <div className="px-32 relative text-mediumContent mb-32">
          <section className="fixed left-0 ml-20">
            <div className="mb-2">
              <button className="mr-2">
                <Clap />
              </button>
              <span className="cursor-pointer text-gray-700 hover:text-black">{clap}</span>
            </div>
            <div className="mb-2">
              <button className="mr-2">
                <Bookmarked />
              </button>
            </div>
          </section>
          <div className="relative mb-6">
            {thumbnail_image_url ? (
              <div className="flex justify-center">
                <Image src={thumbnail_image_url} width={550} height={400} />
              </div>
            ) : null}
            <h1 className="text-5xl font-mediumSecond">{title}</h1>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span>{user?.firstName} {user?.lastName}</span>
                <span className="text-xs text-gray-500">{dayjs(parseInt(createdAt)).format('MMM DD YYYY')}</span>
              </div>
              <div>
                <button className="mr-2">
                  <TwitterSmall />
                </button>
                <button className="mr-2">
                  <FacebookSmall />
                </button>
                <button className="mr-2">
                  <Bookmarked />
                </button>
              </div>
            </div>
          </div>
          <div className="font-mediumParagraphBody text-xl">
            {content}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default StoryDetail
