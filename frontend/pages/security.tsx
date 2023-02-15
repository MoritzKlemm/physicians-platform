import React from 'react'
import {GET_SECURITY} from '../graphql/queries'
import {endpointGraphql} from '../hooks/QueryProvider'
import {GetStaticProps} from 'next'
import request from 'graphql-request'

interface SecurityType {
   securityContent: string
}

const SecurityPage: React.FC<SecurityType> = ({securityContent}) => {
   return (
      <div className="fo-subpage-main-div">
         <h3>SECURITY</h3>
         <p className="fo-subpage-text">{securityContent}</p>
      </div>
   )
}
export default SecurityPage

export const getStaticProps: GetStaticProps = async () => {
   // const guidelinesAndTemplates = await request(endpointGraphql, GET_GUIDELINES_AND_TEMPLATES)
   const {footer} = await request(endpointGraphql, GET_SECURITY)
   console.log(footer)
   return {
      props: {
         securityContent: footer.security
      },
      revalidate: 1
   }
}
