import React from 'react'
import {PanelMemberType} from '../../components/about/About.types'
import {PanelMembersWithSearch} from '../../components/about/PanelMembersWithSearch'
import {RelatedLink, RelatedLinkComponent} from '../../components/about/RelatedLink'
import {GetStaticProps} from 'next'
import request from 'graphql-request'
import {endpointGraphql} from '../../hooks/QueryProvider'
import {GET_ABOUT_PAGE, GET_PANELMEMBERS, GET_RELATED_LINKS} from '../../graphql/queries'
import {usePanelMembers} from '../../hooks/usePanelMembers'
import {ContactForm} from '../../components/about/contactForm/ContactForm'

interface AboutPageType {
   panelMembersPrefetched: Array<PanelMemberType>
   pageContent: {panelMember_introduction: string; contactForm_introduction: string}
   relatedLinksPrefetched: Array<RelatedLink>
}

const AboutPage: React.FC<AboutPageType> = ({
   panelMembersPrefetched,
   pageContent,
   relatedLinksPrefetched
}) => {
   const {data, error, isLoading} = usePanelMembers(panelMembersPrefetched)
   return (
      <div>
         <PanelMembersWithSearch
            panelMembers={data}
            panelMember_introduction={pageContent.panelMember_introduction}
         />
         <RelatedLinkComponent relatedLinks={relatedLinksPrefetched} />
         <ContactForm contactForm_introduction={pageContent.contactForm_introduction} />
      </div>
   )
}
export default AboutPage

export const getStaticProps: GetStaticProps = async () => {
   const {panelMembers} = await request(endpointGraphql, GET_PANELMEMBERS)
   const {pageAbout} = await request(endpointGraphql, GET_ABOUT_PAGE)
   const {relatedLinks} = await request(endpointGraphql, GET_RELATED_LINKS)
   return {
      props: {
         panelMembersPrefetched: panelMembers,
         pageContent: pageAbout,
         relatedLinksPrefetched: relatedLinks
      },
      revalidate: 1
   }
}
