import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { SearchStoryDocument, SearchStoryQuery, SearchStoryQueryVariables, useSearchStoryQuery } from "../../generated/graphql"
import { toastNotification } from '../utils/toasters'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import StoryListBlock from '../components/StoryListBlock'
import { ApolloError, useApolloClient } from '@apollo/client'

dayjs.extend(relativeTime)

type SearchProps = {

}

const Search: React.FC<SearchProps> = ({}) => {
  const router = useRouter()
  const { q } = router.query
  if (q === undefined) {
    return null;
  }

  
  const { data, loading, error } = useSearchStoryQuery({ variables: { keyword: q as string }})
  const client = useApolloClient()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchQuery, setSearchQuery] = useState<SearchStoryQuery|undefined>(undefined)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState<ApolloError|undefined>(undefined)
  
  
  
  useEffect(() => {
    setSearchQuery(data)
    setSearchLoading(loading)
    setSearchError(error)
  }, [loading])


  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { data, loading, error } = await client.query<any, SearchStoryQueryVariables>({
      query: SearchStoryDocument,
      variables: {
        keyword: searchKeyword
      }
    })
    setSearchQuery(data)
    setSearchLoading(loading)
    setSearchError(error)
  }
  

  let body = null;
  if (searchLoading) {
    body = (
      <div>
        <p>Loading</p>
      </div>
    )
  }
  
  if (!searchLoading && searchQuery?.searchStories.length === 0) {
    body = (
      <div>
        <p>No results</p>
      </div>
    )
  }

  if (!searchLoading && searchError) {
    toastNotification.error(searchError.message)
    body = (
      <div>
        <p>Ooops. Something bad happended</p>
      </div>
    )
  }

  if (!searchLoading && searchQuery) {
    body = (
      <StoryListBlock data={searchQuery.searchStories} />
    )
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="h-12 mb-6">
        <input type="search" defaultValue={q} className="w-full h-full border-b p-2 text-4xl focus:outline-none" onChange={(e) => setSearchKeyword(e.target.value)} />
      </form>
      {body}
    </Layout>
  );
}

export default Search