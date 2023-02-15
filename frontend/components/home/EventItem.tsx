import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import {red} from '@material-ui/core/colors'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import EventIcon from '@material-ui/icons/Event'
import Link from 'next/link'
import {EventType} from '../events/Events.types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from '@material-ui/core/Button'
import {isEmpty} from 'lodash'

const useStyles = makeStyles((Theme) =>
   createStyles({
      root: {
         width: '100%',
         height: '100%',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'space-between',
         backgroundColor: 'white'
      },
      titleRoot: {backgroundColor: Theme.palette.primary.main},
      media: {
         height: 0,
         paddingTop: '56.25%' // 16:9
      },
      content: {
         fontSize: 16,
         textAlign: 'center',
         color: 'black'
      },

      avatar: {
         backgroundColor: red[500]
      },
      rootButton: {
         fontSize: 12,
         marginTop: Theme.spacing(3),
         backgroundColor: Theme.palette.primary.main,
         width: '50%',
         color: 'white',
         '&:hover': {
            backgroundColor: Theme.palette.primary.dark
         }
      },
      rootIconDownload: {
         marginRight: Theme.spacing(2)
      }
   })
)
interface EventItemType {
   event: EventType
}
export const EventItem: React.FC<EventItemType> = ({event}) => {
   const classes = useStyles()
   const [expanded, setExpanded] = React.useState(false)

   const handleExpandClick = () => {
      setExpanded(!expanded)
   }

   return (
      <Card className={classes.root}>
         <div>
            <CardContent className={classes.titleRoot}>
               <Container>
                  <Row className="home-announcement-sub flex-direction-column">
                     <Col md={6} className="d-flex justify-content-center">
                        {!isEmpty(event.beginEvent) ? (
                           <div className="event-to-be-announced-wrapper">
                              <p className="event-date">
                                 <EventIcon fontSize={'large'} />
                                 {new Date(event.beginEvent).toDateString()}
                              </p>
                           </div>
                        ) : (
                           <div className="event-to-be-announced-wrapper">
                              <p className="event-to-be-announced-content">
                                 <EventIcon fontSize={'large'} /> date tba
                              </p>
                           </div>
                        )}
                     </Col>
                     <Col md={6} className="d-flex justify-content-center">
                        {!isEmpty(event.location) ? (
                           <div className="event-to-be-announced-wrapper">
                              <p className="event-location">
                                 <LocationOnIcon fontSize={'large'} /> {event.location}
                              </p>
                           </div>
                        ) : (
                           <div className="event-to-be-announced-wrapper">
                              <p className="event-to-be-announced-content">
                                 <LocationOnIcon fontSize={'large'} /> location tba
                              </p>
                           </div>
                        )}
                     </Col>
                  </Row>
               </Container>
            </CardContent>
            <CardContent>
               <div className={classes.content}>{event.title}</div>
            </CardContent>
         </div>
         <div className="align-content-start">
            <CardActions className="justify-content-center">
               <Link
                  href={{
                     pathname: '/events/[slug]',
                     query: {slug: event.eventCode, id: event.id}
                  }}
               >
                  <Button classes={{root: classes.rootButton}} variant="contained" disableElevation>
                     MORE
                  </Button>
               </Link>
            </CardActions>
            <div>
               {!isEmpty(event.updated_at) ? (
                  <p className="event-created-at">created: {event.updated_at.substring(0, 10)}</p>
               ) : (
                  <></>
               )}
            </div>
         </div>
      </Card>
   )
}
