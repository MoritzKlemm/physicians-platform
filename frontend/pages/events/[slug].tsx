import React from 'react'
import {useRouter} from 'next/router'
import {useEvent} from '../../hooks/useEvent'
import PlaceIcon from '@material-ui/icons/Place'
import GrainIcon from '@material-ui/icons/Grain'
import PersonIcon from '@material-ui/icons/Person'
import TodayIcon from '@material-ui/icons/Today'
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation'
import {isEmpty} from 'lodash'
import WebIcon from '@material-ui/icons/Web'

const Event = () => {
   const router = useRouter()
   const {data, isLoading, error} = useEvent(parseInt(router.query.id as string))
   // if (data == undefined) {
   //    return router.push('/').then((r) => (r))
   // }
   if (isLoading) return 'Still loading...'
   if (!isEmpty(data)) {
      return (
         <div className="gen-wrapper-events">
            <div className="event-full-view">
               <h1 className="gen-subheading-first" style={{color: 'black'}}>
                  EVENT
               </h1>
               <div className="ws-outer-box">
                  <div className="ws-inner-box">
                     <div className="container">
                        <div className="row">
                           <div className="col-md-6 col">
                              <h3 className="ws-place-slug">
                                 {data.location ? (
                                    <>
                                       <PlaceIcon className="ws-icons" fontSize={'large'} />
                                       {data.location}
                                    </>
                                 ) : null}
                              </h3>
                           </div>
                           <div className="col-md-6">
                              {data.eventCode ? (
                                 <h3 className="ws-id-slug">
                                    <GrainIcon className="ws-icons" fontSize={'large'} />
                                    {data.eventCode}
                                 </h3>
                              ) : null}
                           </div>
                        </div>
                        <div className="row">
                           {data.beginEvent ? (
                              <>
                                 <div className="col-md-6">
                                    <h3 className="ws-date-slug">
                                       <TodayIcon className="ws-icons" fontSize={'large'} />
                                       Begin: {data.beginEvent}
                                    </h3>
                                 </div>
                                 <div className="col-md-6">
                                    <h3 className="ws-date-slug">
                                       <InsertInvitationIcon
                                          className="ws-icons"
                                          fontSize={'large'}
                                       />
                                       End: {data.endEvent}
                                    </h3>
                                 </div>
                              </>
                           ) : (
                              <div className="col-md-6">
                                 <h3 className="ws-date-slug">
                                    <TodayIcon className="ws-icons" fontSize={'large'} />
                                    date to be announced!
                                 </h3>
                              </div>
                           )}
                        </div>
                        <div className="row">
                           {data.contact ? (
                              <div className="col-md-6">
                                 <h3 className="ws-contact-slug">
                                    <PersonIcon className="ws-icons" fontSize={'large'} />
                                    {data.contact}
                                 </h3>
                              </div>
                           ) : null}
                           {data.eventType ? (
                              <div className="col-md-6">
                                 <h3 className="ws-contact-slug">Type: {data.eventType}</h3>
                              </div>
                           ) : null}
                        </div>
                        <div className="row">
                           <div className="col-md-12">
                              <hr className="ws-title-description-separator" />
                              <p className="ws-title">{data.title}</p>
                              <p className="ws-description">{data.description}</p>
                           </div>
                        </div>
                        {data.url ? (
                           <div className="row">
                              <div className="col-md-12">
                                 <h3 className="ws-url-slug">
                                    <WebIcon className="ws-icons" fontSize={'large'} />
                                    <a
                                       onClick={() => {
                                          window.open(`${data.url}`, '').focus()
                                       }}
                                    >
                                       visit event website
                                    </a>
                                 </h3>
                              </div>
                           </div>
                        ) : null}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   } else {
      return <>currently not available</>
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
