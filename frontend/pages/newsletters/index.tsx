import React, {useEffect, useState} from 'react'
import request from 'graphql-request'
import {GetStaticProps} from 'next'
import {GET_NEWSLETTER_PAGE, GET_NEWSLETTERS} from '../../graphql/queries'
import {endpointGraphql} from '../../hooks/QueryProvider'
import {useNewsletters} from '../../hooks/useNewsletters'
import {Newsletter} from '../../components/newsletters/Newsletters.types'
import {NewsletterTableWithSearch} from '../../components/newsletters/NewsletterTableWithSearch'
import GuidelinesTemplates from '../../components/newsletters/GuidelinesTemplates'
import PreviewRecentEditorial from '../../components/newsletters/RecentEditorial'
import {Subscribe} from '../../components/newsletters/Subscribe'
import Markdown from 'markdown-to-jsx'

interface NewsletterPageType {
   newslettersPreFetched: Newsletter[]
   pageContent: {
      updated_at: string
      newsletter_introduction: string
      GuidelinesForAuthors: {
         introduction: string
         guideline_resources: {url: string}
      }
   }
}

function sortNewsletters(newsletters: Newsletter[]) {
   return newsletters.sort(function (a, b) {
      return b.number - a.number
   })
}
const NewslettersPage: React.FC<NewsletterPageType> = ({newslettersPreFetched, pageContent}) => {
   const {data: newsletters, isLoading, error} = useNewsletters(newslettersPreFetched)
   // const {data: guidelinesAndTemplates} = useGuidelinesAndTemplates(
   //    guidelinesAndTemplatesPreFetched
   // )
   const [sortedNewsletter, setSortedNewsletters] = useState({} as Array<Newsletter>)
   useEffect(() => {
      setSortedNewsletters(sortNewsletters(newsletters))
   }, [])
   console.log(sortedNewsletter)
   return (
      <div>
         <div className="gen-wrapper-newsletter newsletters-recent-editorial-background">
            <h1 className="gen-subheading-first" style={{color: 'black'}}>
               ICFA BEAM DYNAMICS NEWSLETTERS
            </h1>
            <div className="nls-outer-box">
               <p className="gen-subheading-subtext-grey">
                  <Markdown>{pageContent.newsletter_introduction}</Markdown>
               </p>
            </div>
         </div>
         <Subscribe />
         <PreviewRecentEditorial latestNewsletter={sortedNewsletter[0]} />
         <NewsletterTableWithSearch newsletters={newsletters.slice(1)} />
         <GuidelinesTemplates
            content={pageContent.GuidelinesForAuthors}
            lastUpdate={pageContent.updated_at}
         />
      </div>
   )
}

export default NewslettersPage

// default next.js method; runs only once when building the application server side.
export const getStaticProps: GetStaticProps = async () => {
   // const guidelinesAndTemplates = await request(endpointGraphql, GET_GUIDELINES_AND_TEMPLATES)
   const {newsletters} = await request(endpointGraphql, GET_NEWSLETTERS)
   const {pageNewsletter} = await request(endpointGraphql, GET_NEWSLETTER_PAGE)
   return {
      props: {
         newslettersPreFetched: newsletters,
         pageContent: pageNewsletter
      },
      revalidate: 1
   }
}
