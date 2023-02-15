import * as React from 'react'

import Link from 'next/link'
import IconDownload from '../../Icons/IconDownload'
import {Newsletter} from '../../components/newsletters/Newsletters.types'

type RecentEditorial = {
   latestNewsletter: Newsletter
}
const RecentEditorial: React.FC<RecentEditorial> = ({
   latestNewsletter: {title, number, date, content, chiefEditor, issueEditor}
}) => {
   return (
      <div className="container nl-outer-box">
         <div className="nl-inner-box">
            <div className="nl-title-wrapper">
               <h2 className="nl-title">{title}</h2>
            </div>
            <div className="nl-meta-container">
               <p className="nl-text-basics nl-meta">
                  #{number}, {date}
               </p>
               <button
                  className="pdf-button"
                  // onClick={() => {
                  //    window.open(pdf[0].url)
                  // }}
               >
                  <span className="pdf-button-text">PDF</span>
                  <IconDownload color="rgb(74,74,74)" />
               </button>
            </div>
            <div className="nl-line" />
            <p className="nl-content">
               {content?.length > 300 ? `${content.substring(0, 300)} ...` : content}
            </p>
            <div className="nl-expand">
               <Link
                  href={{
                     pathname: '/newsletters/[slug]',
                     query: {slug: number}
                  }}
               >
                  <button className="ws-button-more col-3">full view</button>
               </Link>
            </div>
            <p className="nl-content author">
               <div style={{fontWeight: 800, marginRight: '1vw'}}>Issue Editor: </div>
               <div>{issueEditor}</div>
            </p>
            <p className="nl-content author">
               <div style={{fontWeight: 800, marginRight: '1vw'}}>Editor in Chief: </div>
               <div>{chiefEditor}</div>
            </p>
         </div>
      </div>
   )
}

export default RecentEditorial
