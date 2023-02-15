import React, {useEffect, useState} from 'react'
import {EventItem} from './EventItem'
import {EventType} from '../events/Events.types'
import {EventComponent} from '../events/EventComponent'
import {isEmpty} from 'lodash'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

interface EventPreviewType {
   events: Array<EventType>
}
export const EventPreview: React.FC<EventPreviewType> = ({events}) => {
   const [lastThreeEvents, setLastThreeEvents] = useState(events)
   useEffect(() => {
      !isEmpty(events)
         ? setLastThreeEvents(
              events
                 .filter((item) => {
                    return new Date(`${item.beginEvent}`) > new Date()
                 })
                 .sort(function (itemA, itemB) {
                    return Date.parse(itemA.beginEvent) - Date.parse(itemB.beginEvent)
                 })
                 .slice(0, 3)
           )
         : setLastThreeEvents([])
   }, [events])
   return (
      <div className="gen-wrapper-home about-contact-background pb-5">
         <h1 className="gen-subheading-rest" style={{color: 'white'}}>
            UPCOMING EVENTS <CalendarTodayIcon fontSize="large" />
         </h1>
         <div className="nls-outer-box px-5">
            <h4 className="text-center text-white">
               Please have a look at our upcoming events. Feel free to contact us for any
               information{' '}
            </h4>
         </div>
         <div className="row">
            {!isEmpty(lastThreeEvents) ? (
               lastThreeEvents.map((item, index) => (
                  <div className="d-flex col-md p-0 justify-content-center" key={index}>
                     <div
                        style={{
                           padding: '0px 0px 10px 5px',
                           maxWidth: '300px',
                           height: '100%'
                        }}
                     >
                        <EventItem event={item} key={item.id} />
                     </div>
                  </div>
               ))
            ) : (
               <EventComponent event={null} key={2} />
            )}
         </div>
         <Link
            href={{
               pathname: '/events'
            }}
         >
            <Button
               style={{
                  marginTop: 20,
                  fontSize: 12,
                  backgroundColor: 'white',
                  width: '15%',
                  color: 'black'
               }}
               variant="contained"
               disableElevation
               onClick={() => {}}
            >
               More events
            </Button>
         </Link>
      </div>
   )
}
