import React from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'

interface FooterType {
   global: any
}

export default function Footer() {
   return (
      <div className="fo-wrapper">
         <Container fluid className="d-flex justify-content-center">
            {/*<Link href={`/security`}>*/}
            {/*   <a className="fo-categories">SECURITY</a>*/}
            {/*</Link>*/}
            <Link href={`/privacy`}>
               <a className="fo-categories fo-categories-center">PRIVACY</a>
            </Link>
            <Link href={`/legal`}>
               <a className="fo-categories">LEGAL</a>
            </Link>
         </Container>
      </div>
   )
}
