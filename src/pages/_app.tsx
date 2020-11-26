import '../styles/index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
})

const client = new ApolloClient({
  // ssrMode: true,
  link: (uploadLink as unknown) as ApolloLink,
  cache: new InMemoryCache(),
})

toast.configure()
function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
