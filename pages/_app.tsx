import '../styles/index.css'
import { ApolloClient, InMemoryCache , ApolloProvider } from '@apollo/client'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include'
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
