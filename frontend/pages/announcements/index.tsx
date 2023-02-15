import React from 'react'
import {Announcement} from '../../components/announcements/Announcements.types'
import {useAnnouncements} from '../../hooks/useAnnouncements'
import {AnnouncementTwoRowsComponent} from '../../components/announcements/AnnouncementsTwoRows'

interface AnnouncementsPageType {
   announcements: Array<Announcement>
}

const AnnouncementsPage: React.FC<AnnouncementsPageType> = ({announcements}) => {
   const {data: announcementsData} = useAnnouncements()
   return (
      <div>
         <AnnouncementTwoRowsComponent
            announcements={announcementsData}
            selectedAnnouncement={null}
         />
      </div>
   )
}

export default AnnouncementsPage
