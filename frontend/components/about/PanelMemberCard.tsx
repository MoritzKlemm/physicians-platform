import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {isEmpty} from 'lodash'

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      // card ---------------
      rootCard: {
         backgroundColor: '#ffffff'
      },
      title: {
         fontSize: 14
      },
      bullet: {
         display: 'inline-block',
         margin: '0 2px',
         transform: 'scale(0.8)'
      },
      // card content -------
      rootCardContent: {
         paddingBottom: '0 !important',
         paddingTop: 0,
         paddingLeft: 0,
         paddingRight: 0,
         height: '100%'
      },
      // avatar -------------
      avatarRoot: {
         padding: 5,
         backgroundColor: theme.palette.primary.main
      },
      small: {
         width: theme.spacing(3),
         height: theme.spacing(3)
      },
      large: {
         width: theme.spacing(7),
         height: theme.spacing(7)
      },
      one: {
         color: theme.palette.getContrastText('#fafad2'),
         backgroundColor: 'rgb(250, 250, 210)'
      },
      two: {
         color: theme.palette.getContrastText('#2a9d8f'),
         backgroundColor: 'rgb(135, 206, 250)'
      },
      three: {
         color: theme.palette.getContrastText('#ffa07a'),
         backgroundColor: 'rgb(255, 160, 122)'
      },
      four: {
         color: theme.palette.getContrastText('#87cefa'),
         backgroundColor: 'rgb(145, 238, 145)'
      },
      five: {
         color: theme.palette.getContrastText('#1fb2aa'),
         backgroundColor: 'rgb(255, 255, 224)'
      }
   })
)

export default function PanelMemberCard({panelMember}) {
   const [randomColorIndex, setRandomColorIndex] = useState(0)

   const classes = useStyles()
   const colors = [
      {root: classes.one},
      {root: classes.two},
      {root: classes.three},
      {root: classes.four},
      {root: classes.five}
   ]

   useEffect(() => {
      setRandomColorIndex(Math.floor(Math.random() * 4))
   }, [])

   const bull = <span className={classes.bullet}>•</span>
   return (
      <Card className="ab-card" classes={{root: classes.rootCard}} elevation={0}>
         <CardContent classes={{root: classes.rootCardContent}} className="card-content-wrapper">
            <div>
               <Container>
                  <Row className="ab-card-avatar-name-row">
                     <Col md={2} className="ab-card-avatar-col">
                        <Avatar classes={{root: classes.avatarRoot}} className="ab-card-avatar">
                           {panelMember.firstName.slice(0, 1)}
                           {panelMember.lastName.slice(0, 1)}
                        </Avatar>
                     </Col>
                     <Col md={10} className="ab-card-title-name-col">
                        <Typography variant="h5" component="h2" className="ab-card-name">
                           {panelMember.title} {panelMember.firstName} {panelMember.lastName}
                        </Typography>
                     </Col>
                  </Row>
               </Container>
               {!isEmpty(panelMember.Institution) ? (
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                     {panelMember.Institution.country} {bull} {panelMember.Institution.name}
                  </Typography>
               ) : (
                  <></>
               )}

               <Typography variant="body2" component="p">
                  {panelMember.address}
               </Typography>
            </div>
            <div className="card-action-wrapper">
               <Button
                  color={'primary'}
                  variant="outlined"
                  disableElevation
                  size="small"
                  href={'mailto:' + panelMember.email}
               >
                  EMAIL
               </Button>
            </div>
         </CardContent>
      </Card>
   )
}
