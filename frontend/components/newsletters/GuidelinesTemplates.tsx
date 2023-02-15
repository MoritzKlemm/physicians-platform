import * as React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const useStyles = makeStyles((theme) => ({
   rootButton: {
      fontSize: 12,
      marginTop: theme.spacing(3),
      backgroundColor: '#C2D3C3',
      width: '100%',
      '&:hover': {
         backgroundColor: '#8AAE8C'
      }
   },
   rootIconDownload: {
      marginRight: theme.spacing(2)
   }
}))

interface GuidelinesAndTemplatesContent {
   content: {
      introduction: string
      guideline_resources: {
         url: string
      }
   }
   lastUpdate: string
}

const GuidelinesAndTemplates: React.FC<GuidelinesAndTemplatesContent> = ({content, lastUpdate}) => {
   const classes = useStyles()
   console.log(content)
   return (
      <div className="gen-wrapper-newsletter newsletter-guidelines-background">
         <h1 className="gen-subheading-rest" style={{color: 'black'}}>
            GUIDELINES FOR AUTHORS
         </h1>
         <div className="nlgt-outer-box">
            <div className="nlgt-inner-box">
               <Container fluid>
                  <Row>
                     <Col sm={12}>
                        <p className="nlgt-description">
                           {content ? content.introduction : null}
                           <span className="nlai-last-updated">
                              {' '}
                              Last updated: {lastUpdate.substring(0, 10)}
                           </span>
                        </p>
                     </Col>
                  </Row>
                  <Row>
                     <Col sm={12} className="nlai-meta-right-wrapper">
                        <Button
                           classes={{root: classes.rootButton}}
                           variant="contained"
                           disableElevation
                           onClick={() =>
                              window.open(
                                 `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${content.guideline_resources[0].url}`
                              )
                           }
                        >
                           <PictureAsPdfIcon
                              classes={{root: classes.rootIconDownload}}
                              fontSize={'medium'}
                           />
                           DOWNLOAD PDF
                        </Button>
                     </Col>
                  </Row>
               </Container>
            </div>
         </div>
      </div>
   )
}

export default GuidelinesAndTemplates
