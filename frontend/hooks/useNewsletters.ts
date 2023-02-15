import {GET_NEWSLETTERS} from '../graphql/queries'
import {useQuery} from 'react-query'
import request from 'graphql-request'
import {endpointGraphql} from './QueryProvider'
import {Newsletter} from '../components/newsletters/Newsletters.types'

export const useNewsletters = (initialData: Newsletter[]) => {
   return useQuery<Array<Newsletter>, Error>(
      'newsletters',
      async () => {
         const {newsletters} = await request(endpointGraphql, GET_NEWSLETTERS)
         return newsletters
      },
      {
         initialData: initialData
      }
   )
}
