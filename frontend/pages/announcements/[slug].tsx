import React from 'react'
import {useRouter} from 'next/router'

import {isEmpty} from 'lodash'
import {useAnnouncement} from '../../hooks/useAnnouncement'
import {useAnnouncements} from '../../hooks/useAnnouncements'
import {AnnouncementTwoRowsComponent} from '../../components/announcements/AnnouncementsTwoRows'

const Event = () => {
   const router = useRouter()
   const {data: selectedAnnouncement} = useAnnouncement(parseInt(router.query.slug as string))
   const {data: announcementsData} = useAnnouncements()
   if (!isEmpty(announcementsData && selectedAnnouncement)) {
      return (
         <div className="gen-wrapper-announcements">
            <AnnouncementTwoRowsComponent
               announcements={announcementsData}
               selectedAnnouncement={selectedAnnouncement}
            />
         </div>
      )
   } else {
      return <>Not available</>
   }
}
export default Event

// export async function getStaticPaths() {
//    const {events} = await request(endpointGraphql, GET_EVENTS)
//    return {
//       paths: events.map((event: EventType) => ({
//          params: {
//             slug: event.eventCode
//          }
//       })),
//       fallback: false
//    }
// }
//
// export const getStaticProps: GetStaticProps = async () => {
//    const router = useRouter()
//    const {events} = await request(endpointGraphql, GET_EVENT_BY_ID)
//    return {
//       props: {eventsPrefetched: events},
//       revalidate: 1
//    }
// }
