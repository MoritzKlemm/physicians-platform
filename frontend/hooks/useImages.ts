import {GET_HOME_PAGE} from '../graphql/queries'
import {useQuery} from 'react-query'
import request from 'graphql-request'
import {endpointGraphql} from './QueryProvider'
import {cover_images} from '../components/home/Home.types'

export const useImages = () => {
   return useQuery<Array<cover_images>, Error>('Jumbotron', async () => {
      const {pageHome} = await request(endpointGraphql, GET_HOME_PAGE)
      return pageHome.cover_images
   })
}
