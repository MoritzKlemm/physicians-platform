import React from 'react'
import {GET_EVENTS, GET_EVENTS_PAGE} from '../../graphql/queries'
import {GetStaticProps} from 'next'
import request from 'graphql-request'
import {useEvents} from '../../hooks/useEvents'
import {endpointGraphql} from '../../hooks/QueryProvider'
import {EventPageType} from '../../components/events/Events.types'
import {ContactForm} from '../../components/events/contactForm/ContactForm'
import {EventTableWithSearch} from '../../components/events/EventTableWithSearch'

const EventPage: React.FC<EventPageType> = (props) => {
   const {data, error, isLoading} = useEvents(props.eventsPrefetched)
   return (
      <div>
         <EventTableWithSearch
            events={data}
            error={error}
            isLoading={isLoading}
            content={props.pageContent.event_introduction}
         />
         <ContactForm content={props.pageContent.ContactForm} />
      </div>
   )
}

export default EventPage

export const getStaticProps: GetStaticProps = async () => {
   const {events} = await request(endpointGraphql, GET_EVENTS)
   const {eventsPage} = await request(endpointGraphql, GET_EVENTS_PAGE)
   return {
      props: {eventsPrefetched: events, pageContent: eventsPage},
      revalidate: 1
   }
}
