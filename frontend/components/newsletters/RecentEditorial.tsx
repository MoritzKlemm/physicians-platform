import * as React from 'react'
import {isEmpty} from 'lodash'
import {Newsletter} from './Newsletters.types'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'

import Switch from '@material-ui/core/Switch'
import Collapse from '@material-ui/core/Collapse'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const useStyles = makeStyles((Theme) => ({
   root: {
      height: 180
   },
   container: {
      display: 'flex'
   },
   paper: {
      margin: Theme.spacing(1)
   },
   svg: {
      width: 100,
      height: 100
   },
   polygon: {
      fill: Theme.palette.common.white,
      stroke: Theme.palette.divider,
      strokeWidth: 1
   },
   rootButton: {
      fontSize: 12,
      marginBottom: Theme.spacing(3),
      backgroundColor: '#C2D3C3',
      '&:hover': {
         backgroundColor: '#8AAE8C'
      },
      [Theme.breakpoints.down(Theme.breakpoints.values.sm)]: {
         height: 30,
         fontSize: 11
      }
   },
   bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
   },
   rootIconDownload: {
      marginRight: Theme.spacing(2)
   }
}))

type RecentEditorial = {
   latestNewsletter: Newsletter
}
const PreviewRecentEditorial: React.FC<RecentEditorial> = ({latestNewsletter}) => {
   const classes = useStyles()
   const [checked, setChecked] = React.useState(false)

   const handleChange = () => {
      setChecked((prev) => !prev)
   }

   React.useEffect(() => {}, [checked])

   const bull = <span className={classes.bullet}>•</span>
   if (!isEmpty(latestNewsletter)) {
      return (
         <div className="gen-wrapper-newsletter newsletters-recent-editorial-background mb-5">
            <h1 className="gen-subheading-first" style={{color: 'black'}}>
               RECENT NEWSLETTER
            </h1>
            <div className="container nl-outer-box">
               <div className="nl-inner-box">
                  <div className="nl-title-wrapper">
                     <h2 className="nl-title">{latestNewsletter.title}</h2>
                  </div>
                  <div className="nl-meta-container">
                     <p className="nl-meta-published">Published: {latestNewsletter.date}</p>
                     <p className="nl-meta-bull">{bull}</p>
                     <p className="nl-meta-newsletter"> Newsletter #{latestNewsletter.number}</p>
                  </div>
                  <div className="d-flex justify-content-center">
                     <Button
                        classes={{root: classes.rootButton}}
                        variant="contained"
                        disableElevation
                        onClick={() => window.open(latestNewsletter.pdf)}
                     >
                        <PictureAsPdfIcon
                           classes={{root: classes.rootIconDownload}}
                           fontSize={'medium'}
                        />
                        DOWNLOAD PDF
                     </Button>
                  </div>
                  <div className="nl-line" />

                  <p className="nl-content">
                     {!checked ? latestNewsletter.content.substring(0, 500) + ' ...' : null}
                     <Collapse in={checked}>
                        {latestNewsletter.content}{' '}
                        <div className="nl-content author" style={{marginTop: '15px'}}>
                           <span style={{fontWeight: 800, marginRight: '1vw'}}>Issue Editor: </span>
                           <span>{latestNewsletter.issueEditor}</span>
                        </div>
                        <div className="nl-content author">
                           <span style={{fontWeight: 800, marginRight: '1vw'}}>
                              Editor in Chief:{' '}
                           </span>
                           <span>{latestNewsletter.chiefEditor}</span>
                        </div>
                     </Collapse>
                  </p>
                  <div className="d-flex justify-content-center">
                     <FormControlLabel
                        color="primary"
                        control={
                           <Switch color="primary" checked={checked} onChange={handleChange} />
                        }
                        label={checked ? 'READ LESS' : 'READ MORE'}
                     />
                  </div>
               </div>
            </div>
         </div>
      )
   } else {
      return null
      // return (
      //    <div className="gen-wrapper-newsletter newsletters-recent-editorial-background">
      //       <h1 className="gen-subheading-first">RECENT EDITORIAL</h1>
      //    </div>
      // )
   }
}

export default PreviewRecentEditorial
