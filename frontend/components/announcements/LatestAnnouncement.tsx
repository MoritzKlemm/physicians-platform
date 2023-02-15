import React, {useState} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import EventIcon from '@material-ui/icons/Event'
import PersonIcon from '@material-ui/icons/Person'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Markdown from 'markdown-to-jsx'
import {Announcement} from './Announcements.types'

const useStyles = makeStyles<Theme>((theme) => ({
   root: {
      margin: 15,
      padding: 15,
      maxWidth: (fullText) => (!fullText ? 700 : 1000),
      maxWidthFullText: 1000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around'
   },
   media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
   },

   buttonMore: {
      backgroundColor: '#28699e',
      maxWidth: 100,
      minWidth: 25,
      color: 'white',
      '&:hover': {
         backgroundColor: 'rgb(210, 217, 223)'
      }
   }
}))
interface AnnouncementType {
   announcement: Announcement
   fullText?: boolean
}
export const LatestAnnouncement: React.FC<AnnouncementType> = ({
   announcement,
   fullText = false
}) => {
   const classes = useStyles(fullText)
   const [expand, setExpand] = useState(false)

   const handleExpandClick = () => {
      setExpand(!expand)
   }

   return (
      <Card className={classes.root} variant={'outlined'}>
         <CardContent>
            <div className="row justify-content-center text-center">
               <h2 style={{marginBottom: '25px'}}>{announcement.title}</h2>
            </div>
            <div className="row jus">
               <EventIcon fontSize="large" />
               <h4>{new Date(announcement.created_at).toDateString()}</h4>
            </div>
            <div className="row">
               <PersonIcon fontSize="large" />
               <h4>{announcement.author}</h4>
            </div>
         </CardContent>
         {!fullText ? (
            <>
               <CardContent>
                  <div className="home-announcement-text">
                     <Markdown>
                        {!expand && announcement.content?.length > 700
                           ? `${announcement.content.substring(0, 700)} ...`
                           : announcement.content}
                     </Markdown>
                  </div>
               </CardContent>
               <CardActions className="justify-content-center">
                  <button
                     className={classes.buttonMore}
                     style={{width: '50%'}}
                     onClick={() => setExpand(!expand)}
                  >
                     {expand ? (
                        <ExpandLessIcon fontSize={'large'} />
                     ) : (
                        <ExpandMoreIcon fontSize={'large'} />
                     )}
                  </button>
               </CardActions>
            </>
         ) : (
            <CardContent>
               <div className="home-announcement-text">
                  <Markdown>{announcement.content}</Markdown>
               </div>
            </CardContent>
         )}
      </Card>
   )
}
