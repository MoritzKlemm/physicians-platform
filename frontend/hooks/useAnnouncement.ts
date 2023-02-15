import {endpointGraphql, queryClient} from './QueryProvider'
import {useQuery} from 'react-query'
import request from 'graphql-request'
import {GET_ANNOUNCEMENT_BY_ID} from '../graphql/queries'
import {Announcement} from '../components/announcements/Announcements.types'

const announcements = queryClient.getQueryData<Array<Announcement>>('announcements')

export const useAnnouncement = (announcementId: number) => {
   return useQuery(['announcements', announcementId], async () => {
      try {
         const {announcement} = await request(endpointGraphql, GET_ANNOUNCEMENT_BY_ID, {
            id: announcementId
         })
         return announcement
      } catch (e) {
         console.log(e)
      }
   })
}
