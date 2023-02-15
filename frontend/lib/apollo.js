import {ApolloClient, InMemoryCache} from '@apollo/client'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL
const apolloClient = new ApolloClient({
   uri: `${API_URL}/graphql`,
   cache: new InMemoryCache()
})

export default apolloClient
