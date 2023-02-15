import React from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import {isEmpty} from 'lodash'

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         width: '100%'
      },
      buttonRoot: {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'spaceBetween',
         height: theme.spacing(10),
         width: '100%',
         fontSize: 16,
         padding: theme.spacing(3),
         borderRadius: 0,
         textTransform: 'none'
      }
   })
)
export interface RelatedLink {
   url: string
   name: string
   id: string
   created_at: string
   updated_at: string
   published_at: string
}
interface RelatedLinkProps {
   relatedLinks: Array<RelatedLink>
}

export const RelatedLinkComponent: React.FC<RelatedLinkProps> = ({relatedLinks}) => {
   const classes = useStyles()

   return (
      <div className="gen-wrapper-about">
         <h1 className="gen-subheading-rest" style={{color: 'black'}}>
            RELATED LINKS
         </h1>
         <div className="ab-related-links-outer-box">
            {!isEmpty(relatedLinks) ? (
               relatedLinks.map((relatedLinks) => (
                  <div className="m-3" key={relatedLinks.id}>
                     <Button
                        className="d-flex justify-content-between"
                        classes={{root: classes.buttonRoot}}
                        disableElevation
                        variant="contained"
                        href={relatedLinks.url}
                        target="_blank"
                     >
                        <p className="ab-related-links-button-text">{relatedLinks.name}</p>
                        <div>
                           <OpenInNewIcon fontSize="large" />
                        </div>
                     </Button>
                  </div>
               ))
            ) : (
               <div className="text-center" style={{fontSize: 16}}>
                  No Links added.
               </div>
            )}
         </div>
      </div>
   )
}
