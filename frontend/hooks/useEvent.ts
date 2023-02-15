import {endpointGraphql, queryClient} from './QueryProvider'
import {useQuery} from 'react-query'
import request from 'graphql-request'
import {GET_EVENT_BY_ID} from '../graphql/queries'
import {EventType} from '../components/events/Events.types'

const events = queryClient.getQueryData<Array<EventType>>('events')

export const useEvent = (eventId: number) => {
   return useQuery(
      ['events', eventId],
      async () => {
         try {
            const {event} = await request(endpointGraphql, GET_EVENT_BY_ID, {id: eventId})
            return event
         } catch (e) {
            console.error('NO VALID EVENT ID')
         }
      },
      {
         initialData: () => {
            const initial = queryClient.getQueryData<Array<EventType>>('events')
            return initial ? initial.find((event) => event.id == eventId) : {}
         }
      }
   )
}
