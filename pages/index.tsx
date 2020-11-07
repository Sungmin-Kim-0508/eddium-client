import Layout from '../components/Layout'
import { useGetAllStoriesForHomePageQuery } from '../generated/graphql'


export default function IndexPage() {
  const { data, loading, error } = useGetAllStoriesForHomePageQuery()

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <Layout>
        {data?.getAllStories.map(story => (
          <div>{story.title}</div>
        ))}
      </Layout>
    </div>
  )
}
