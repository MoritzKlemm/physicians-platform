import {GET_EVENTS} from '../graphql/queries'
import {useQuery} from 'react-query'
import request from 'graphql-request'
import {endpointGraphql} from './QueryProvider'
import {EventType} from '../components/events/Events.types'

export const useEvents = (initialData: EventType[]) => {
   return useQuery<Array<EventType>, Error>(
      'events',
      async () => {
         const {events} = await request(endpointGraphql, GET_EVENTS)
         return events
      },
      {
         initialData: initialData
      }
   )
}
