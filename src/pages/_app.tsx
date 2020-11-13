import '../styles/index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { HelmetProvider } from 'react-helmet-async'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const client = new ApolloClient({
  // ssrMode: true,
  link: createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    // headers:
  }),
  cache: new InMemoryCache(),
})

toast.configure()
function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <Component {...pageProps} />
      </HelmetProvider>
    </ApolloProvider>
  )
}

export default MyApp
