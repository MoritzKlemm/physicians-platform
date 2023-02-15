import React, {useEffect, useState} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {LatestAnnouncement} from './LatestAnnouncement'

import {isEmpty} from 'lodash'
import {Announcement} from './Announcements.types'

interface LatestAnnouncementType {
   announcements: Array<Announcement>
}
const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      // card ---------------
      root: {
         display: 'flex'
      },
      title: {
         fontSize: 14
      }
   })
)

function removeA(arrayOfObjects, values) {
   for (var i = 0; i < arrayOfObjects.length; i++) {
      var obj = arrayOfObjects[i]

      if (values.indexOf(obj.id) !== -1) {
         arrayOfObjects.splice(i, 1)
      }
   }
   return arrayOfObjects
}
export const AnnouncementComponent: React.FC<LatestAnnouncementType> = ({announcements}) => {
   const classes = useStyles()
   const [filteredAnnouncements, setFilteredAnnouncements] = useState(announcements)
   useEffect(() => {
      !isEmpty(announcements)
         ? setFilteredAnnouncements(
              announcements.sort(function (itemA, itemB) {
                 return Number.parseFloat(itemB.id) - Number.parseFloat(itemA.id)
              })
              // .slice(0, 4)
           )
         : setFilteredAnnouncements([])
   }, [announcements])
   return (
      <div className="gen-wrapper-home">
         {!isEmpty(filteredAnnouncements) ? (
            <div className="row">
               <div className="col-md justify-content-center">
                  <h1
                     className="gen-subheading-first"
                     style={{color: 'black'}}
                     id="home-interactive"
                  >
                     LAST ANNOUNCEMENT
                  </h1>
                  <LatestAnnouncement announcement={filteredAnnouncements[0]} />
               </div>
               {/*<div className="col-md-3 col" style={{marginTop: '50px'}}>*/}
               {/*   <h3 className="text-center" style={{color: 'black'}} id="home-interactive">*/}
               {/*      OTHER ANNOUNCEMENTS*/}
               {/*   </h3>*/}
               {/*   {filteredAnnouncements[1] ? (*/}
               {/*      filteredAnnouncements*/}
               {/*         .slice(1, 4)*/}
               {/*         .map((item) => <OtherAnnouncement data={item} />)*/}
               {/*   ) : (*/}
               {/*      <h4 className="text-center my-5">No announcements found!</h4>*/}
               {/*   )}*/}
               {/*</div>*/}
            </div>
         ) : null}
      </div>
   )
}
