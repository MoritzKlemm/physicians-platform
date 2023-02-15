import {GET_HOME_PAGE} from '../graphql/queries'
import {useQuery} from 'react-query'
import request from 'graphql-request'
import {endpointGraphql} from './QueryProvider'
import {PageHome} from '../components/home/Home.types'

export const usePageHome = () => {
   return useQuery<Array<PageHome>, Error>('pageHome', async () => {
      const {pageHome} = await request(endpointGraphql, GET_HOME_PAGE)
      return pageHome
   })
}
