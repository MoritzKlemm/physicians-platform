import React from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {GuidelinesAndTemplatesForEvents} from './Events.types'
import Markdown from 'markdown-to-jsx'

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      heading: {
         fontSize: 16,
         letterSpacing: 1.5,
         color: '#434348'
      },

      box: {
         backgroundColor: 'rgb(231, 231, 231)'
      },
      setMargin: {
         marginBottom: '15px',
         backgroundColor: 'rgb(231, 231, 231)'
      }
   })
)
interface ICFAWSGContent {
   content: GuidelinesAndTemplatesForEvents
}

export const ICFAWorkshopGuidelines: React.FC<ICFAWSGContent> = ({content}) => {
   const classes = useStyles()
   return (
      <div className="gen-wrapper-events events-guidelines-background">
         <h1 className="gen-subheading-rest">HOW TO ANNOUNCE OTHER BEAM DYNAMICS EVENTS</h1>
         <div className="ws-how-to-outer-box">
            <div className="ws-how-to-inner-box">
               <p className="ws-how-to-intro-text">
                  <Markdown>{content.introduction ? content.introduction : null}</Markdown>
               </p>
               {/*<Accordion*/}
               {/*  square*/}
               {/*  className={(classes.box, classes.setMargin)}*/}
               {/*  variant={'outlined'}*/}
               {/*>*/}
               {/*  <AccordionSummary*/}
               {/*    expandIcon={<ExpandMoreIcon />}*/}
               {/*    aria-controls="panel1a-content"*/}
               {/*    id="panel1a-header"*/}
               {/*  >*/}
               {/*    <Typography className={classes.heading}>ICFA Mini-Workshop</Typography>*/}
               {/*  </AccordionSummary>*/}
               {/*  <AccordionDetails>*/}
               {/*    <p className="ws-how-to-text">*/}
               {/*      <Markdown>{content.GuidelinesMiniWorkshop}</Markdown>*/}
               {/*    </p>*/}
               {/*  </AccordionDetails>*/}
               {/*</Accordion>*/}
               {/*<Accordion square className={classes.box} variant={'outlined'}>*/}
               {/*  <AccordionSummary*/}
               {/*    expandIcon={<ExpandMoreIcon />}*/}
               {/*    aria-controls="panel2a-content"*/}
               {/*    id="panel2a-header"*/}
               {/*  >*/}
               {/*    <Typography className={classes.heading}>ICFA Advanced-Workshop</Typography>*/}
               {/*  </AccordionSummary>*/}
               {/*  <AccordionDetails>*/}
               {/*    <p className="ws-how-to-text">*/}
               {/*      <Markdown>{content.GuidelinesAdvancedBeamDynamicsWorkshops}</Markdown>*/}
               {/*    </p>*/}
               {/*  </AccordionDetails>*/}
               {/*</Accordion>*/}
            </div>
         </div>
      </div>
   )
}
