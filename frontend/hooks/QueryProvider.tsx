//Polling interval is 1 Minute
import {DefaultOptions, QueryClient, QueryClientProvider} from 'react-query'
import React from 'react'

const defaults: DefaultOptions = {
   queries: {
      retry: 3,
      refetchOnWindowFocus: true,
      staleTime: 0,
      refetchInterval: 10000
   }
}

export const queryClient = new QueryClient({defaultOptions: defaults})
export const endpointGraphql = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`

//TODO: ADD default errorhandling
export const QueryProvider: React.FC = ({children}) => {
   queryClient.setDefaultOptions({
      queries: {...defaults.queries}
   })
   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
