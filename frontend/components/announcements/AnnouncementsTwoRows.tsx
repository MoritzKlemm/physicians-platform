import {Announcement} from './Announcements.types'
import React, {useEffect, useState} from 'react'
import {LatestAnnouncement} from './LatestAnnouncement'
import {OtherAnnouncement} from './OtherAnnouncement'
import {isEmpty} from 'lodash'

interface AnnouncementTwoRowsComponentType {
   announcements: Array<Announcement>
   selectedAnnouncement?: Announcement
}
export const AnnouncementTwoRowsComponent: React.FC<AnnouncementTwoRowsComponentType> = ({
   announcements,
   selectedAnnouncement
}) => {
   const [filteredAnnouncements, setFilteredAnnouncements] = useState(announcements)
   const [selectedAnnouncementThisPage, setSelectedAnnouncementThisPage] = useState(null)
   useEffect(() => {
      if (!isEmpty(announcements)) {
         const sortedAnnouncement = announcements.sort(function (itemA, itemB) {
            return Number.parseFloat(itemB.id) - Number.parseFloat(itemA.id)
         })
         if (isEmpty(selectedAnnouncement)) {
            setSelectedAnnouncementThisPage(sortedAnnouncement[0])
         } else {
            setSelectedAnnouncementThisPage(selectedAnnouncement)
         }
         setFilteredAnnouncements(sortedAnnouncement)
      } else {
         setFilteredAnnouncements([])
      }
   }, [announcements])

   let removedCurrentAnnouncements = null
   //filter the current annoucemnet out of list
   if (!isEmpty(filteredAnnouncements) && selectedAnnouncementThisPage) {
      removedCurrentAnnouncements = filteredAnnouncements.slice()
      var index = removedCurrentAnnouncements.findIndex(function (o) {
         return o.id === selectedAnnouncementThisPage.id
      })
      if (index !== -1) removedCurrentAnnouncements.splice(index, 1)
   }
   return (
      <div className="gen-wrapper-home">
         {!isEmpty(filteredAnnouncements) ? (
            <>
               <div className="row justify-content-center">
                  <div className="col ">
                     <h1
                        className="gen-subheading-rest text-center"
                        style={{color: 'black'}}
                        id="home-interactive"
                     >
                        {!selectedAnnouncement
                           ? 'LAST ANNOUNCEMENT'
                           : `ANNOUNCEMENT FROM ${new Date(
                                selectedAnnouncement.created_at
                             ).toDateString()}`}
                     </h1>
                     <LatestAnnouncement
                        announcement={
                           selectedAnnouncement ? selectedAnnouncement : filteredAnnouncements[0]
                        }
                        fullText={true}
                     />
                  </div>
               </div>
               <h3
                  className="text-center"
                  style={{color: 'black', marginTop: '50px'}}
                  id="home-interactive"
               >
                  OTHER ANNOUNCEMENTS
               </h3>
               <div className="row more-announcements justify-content-center">
                  {!isEmpty(removedCurrentAnnouncements) ? (
                     removedCurrentAnnouncements.map((item) => <OtherAnnouncement data={item} />)
                  ) : (
                     <h4 className="text-center my-5">No announcements found!</h4>
                  )}
               </div>
            </>
         ) : null}
      </div>
   )
}
