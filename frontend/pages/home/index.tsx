import * as React from 'react'
import {EventType} from '../../components/events/Events.types'
import ICFAGoal from '../../components/home/ICFAGoal'
import CarouselCustom from '../../components/home/CarouselCustom'
import {EventPreview} from '../../components/home/EventPreview'
import {GetStaticProps} from 'next'
import request from 'graphql-request'
import {endpointGraphql} from '../../hooks/QueryProvider'
import {GET_EVENTS} from '../../graphql/queries'
import {useEvents} from '../../hooks/useEvents'
import {usePageHome} from '../../hooks/usePageHome'
import {Announcement} from '../../components/announcements/Announcements.types'
import {AnnouncementComponent} from '../../components/announcements/Announcemenet'
import {useAnnouncements} from '../../hooks/useAnnouncements'

interface HomePageType {
   eventsPrefetched: EventType[]
   announcementsPrefetched: Array<Announcement>
}

const HomePage: React.FC<HomePageType> = ({eventsPrefetched, announcementsPrefetched}) => {
   const {
      data: eventsData,
      error: eventsError,
      isLoading: eventsIsLoading
   } = useEvents(eventsPrefetched)

   const {
      data: announcementsData,
      error: announcementsError,
      isLoading: announcementsIsLoading
   } = useAnnouncements()

   const {data: pageHomeData, status} = usePageHome()

   return (
      <div>
         <div className="carousel-main-wrapper">
            {status === 'error' && (
               <div className="carousel-loading-background">
                  <p className="carousel-loading-message">An error has occurred.</p>
               </div>
            )}
            {status === 'loading' && (
               <div className="carousel-loading-background">
                  <p className="carousel-loading-message">Loading images...</p>
               </div>
            )}
            {status === 'success' && <CarouselCustom data={pageHomeData} />}
         </div>
         <ICFAGoal />
         <EventPreview events={eventsData} />
         <AnnouncementComponent announcements={announcementsData} />
      </div>
   )
}
export default HomePage

export const getStaticProps: GetStaticProps = async () => {
   const {events} = await request(endpointGraphql, GET_EVENTS)
   return {
      props: {eventsPrefetched: events},
      revalidate: 1
   }
}
