import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Link from 'next/link'
import Card from '@material-ui/core/Card'
import React from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import EventIcon from '@material-ui/icons/Event'
import {Announcement} from './Announcements.types'

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         maxWidth: 220,
         height: 200,
         margin: 15,
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'space-around',
         backgroundColor: '#28699e'
      },
      buttonMore: {
         backgroundColor: 'white',
         '&:hover': {
            backgroundColor: 'rgb(210, 217, 223)'
         }
      },
      title: {marginTop: 8, color: 'white', fontSize: 15, textAlign: 'center'},
      createdAtAndAuthor: {
         color: 'white',
         fontSize: 12,
         fontWeight: 'bold'
      },
      card: {
         paddingBottom: '15px!important'
      }
   })
)

interface OtherAnnouncementType {
   data: Announcement
}
export const OtherAnnouncement: React.FC<OtherAnnouncementType> = ({data: announcement}) => {
   const classes = useStyles()

   return (
      <Card className={classes.root} variant={'outlined'}>
         <div className="align-content-start">
            <CardContent classes={{root: classes.card}}>
               <div className="home-announcement-sub">
                  <div className="row justify-content-center">
                     <EventIcon fontSize="medium" style={{color: 'white'}} />
                     <div className={classes.createdAtAndAuthor}>
                        {new Date(announcement.created_at).toDateString()}
                     </div>
                  </div>
                  <div className="row justify-content-center">
                     <PersonIcon fontSize="medium" style={{color: 'white'}} />
                     <div className={classes.createdAtAndAuthor}>{announcement.author}</div>{' '}
                  </div>
               </div>
               <div className={classes.title}>{announcement.title}</div>
            </CardContent>
         </div>
         <div className="align-content-start">
            <CardActions className="justify-content-center">
               <Link
                  href={{
                     pathname: '/announcements/[slug]',
                     query: {slug: announcement.id}
                  }}
               >
                  <Button className={classes.buttonMore} style={{width: '50%'}}>
                     view
                  </Button>
               </Link>
            </CardActions>
         </div>
      </Card>
   )
}
