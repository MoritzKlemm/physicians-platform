import {GET_ANNOUNCEMENTS} from '../graphql/queries'
import {useQuery} from 'react-query'
import request from 'graphql-request'
import {endpointGraphql} from './QueryProvider'
import {Announcement} from '../components/announcements/Announcements.types'

export const useAnnouncements = () => {
   return useQuery<Array<Announcement>, Error>('announcements', async () => {
      const {announcements} = await request(endpointGraphql, GET_ANNOUNCEMENTS)
      return announcements
   })
}
