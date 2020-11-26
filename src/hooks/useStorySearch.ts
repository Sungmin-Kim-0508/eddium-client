import { useEffect, useState } from 'react'
import { Story, useGetAllStoriesWithPaginationQuery } from '../../generated/graphql'

const useBookSearch = (pageNumber: number) => {
  const { data, loading, error } = useGetAllStoriesWithPaginationQuery({ variables: { page: pageNumber } })
  const [stories, setStories] = useState<Story[]>([])
  const [hasMore, setHasMore] = useState(false)
  useEffect(() => {
    console.log(data)
    if (data?.getAllStoriesWithPagination.stories.length === 0) {
      setHasMore(false)
    } else {
      // setStories([...stories, data?.getAllStoriesWithPagination.stories as Story])
      setHasMore(true)
    }
  }, [pageNumber, loading])

  return { data, loading, error, hasMore }
}

export default useBookSearch