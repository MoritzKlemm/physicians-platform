import React, {useState} from 'react'
import {Newsletter} from './Newsletters.types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import Markdown from 'markdown-to-jsx'

const useStyles = makeStyles((Theme) => ({
   rootButton: {
      fontSize: 12,
      height: 35,
      // marginTop: theme.spacing(3),
      backgroundColor: '#C2D3C3',
      width: '100%',
      '&:hover': {
         backgroundColor: '#8AAE8C'
      },
      [Theme.breakpoints.down(Theme.breakpoints.values.md)]: {
         height: 30
      }
   },
   rootIconDownload: {
      marginRight: Theme.spacing(2)
   }
}))

interface NewsletterItemType {
   item: Newsletter
}
export const NewsletterItem: React.FC<NewsletterItemType> = ({item}) => {
   const classes = useStyles()
   const [expand, setExpand] = useState(false)
   return (
      <div className="nlai-outer-box">
         <div className="nlai-inner-box">
            <Container fluid>
               <Row xs={1} className="nlai-meta-row">
                  <Col xs={6} className="p-0">
                     <h3 className="nlai-number ">Newsletter #{item.number}</h3>
                     <h3 className="nlai-date ">Published: {item.date}</h3>
                  </Col>
                  <Col xs={6} className="p-0">
                     <h4 className="nlai-author"> Issue Editor: {item.issueEditor}</h4>
                     <h4 className="nlai-author"> Editor in Chief: {item.chiefEditor}</h4>
                  </Col>
               </Row>

               <div>
                  <div>
                     <h3 className="nlai-title">{item.title}</h3>
                     <p className="nlai-description">
                        <Markdown>
                           {!expand && item.content?.length > 270
                              ? `${item.content.substring(0, 270)} ...`
                              : item.content}
                        </Markdown>
                        <a
                           className="nlai-wrapper-read-more-less"
                           onClick={() => setExpand(!expand)}
                        >
                           {expand ? (
                              <p className="nlai-text-read-more-less"> read less</p>
                           ) : (
                              <p className="nlai-text-read-more-less"> read more</p>
                           )}
                        </a>
                     </p>
                  </div>

                  <Row className="nlai-download-button-row pt-15">
                     <Button
                        classes={{root: classes.rootButton}}
                        variant="contained"
                        disableElevation
                        onClick={() => {
                           window.open(item.pdf)
                        }}
                     >
                        <PictureAsPdfIcon
                           classes={{root: classes.rootIconDownload}}
                           fontSize={'medium'}
                        />
                        DOWNLOAD PDF
                     </Button>
                  </Row>
               </div>
            </Container>
         </div>
      </div>
   )
}
