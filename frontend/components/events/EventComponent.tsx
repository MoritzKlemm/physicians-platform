import React from 'react'
import Link from 'next/link'
import PlaceIcon from '@material-ui/icons/Place'
import TodayIcon from '@material-ui/icons/Today'
import {isEmpty} from 'lodash'
import {EventComponentType} from './Events.types'

export const EventComponent: React.FC<EventComponentType> = ({event}) => {
   if (!isEmpty(event)) {
      return (
         <div className="ws-main-div">
            <div className="ws-outer-box">
               <div className="ws-inner-box">
                  <div className="container">
                     <div className="row">
                        <div className="col-md-10">
                           <h3 className="ws-date">
                              <PlaceIcon className="ws-icons" fontSize={'large'} />
                              {event.location}
                           </h3>
                           {/* <h3 className="ws-seperator"> | </h3> */}
                           <h3 className="ws-place">
                              <TodayIcon
                                 className="ws-icons"
                                 fontSize={'large'}
                                 style={{marginLeft: '35px'}}
                              />
                              {event.beginEvent}
                           </h3>
                        </div>
                        <div className="col-md-2">
                           <h3 className="ws-id">{event.eventCode}</h3>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-md-10">
                           <p className="ws-title">{event.title}</p>
                           <p className="ws-description">
                              {event.description?.length > 150
                                 ? `${event.description.substring(0, 150)} ...`
                                 : event.description}
                           </p>
                        </div>
                        <div className="col-md-2 ws-row-align-items-bottom-right">
                           <Link
                              href={{
                                 pathname: '/events/[slug]',
                                 query: {slug: event.eventCode, id: event.id}
                              }}
                           >
                              <button className="ws-button-more">more</button>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   } else {
      return (
         <div className="ws-main-div">
            <div className="ws-outer-box ">
               <div className="ws-inner-box">
                  <p>There are currently no events registered. </p>
                  <p>
                     If you want to publish an event, please fill out the event form or contact a
                     panel member.
                  </p>
               </div>
            </div>
         </div>
      )
   }
}
