import React from 'react'
import {useUser} from '../../context/UserProvider'
import {SUCCESS} from '../../context/AuthProvider'
import {useRouter} from 'next/router'

interface InternalPageType {
   events?: any
}

export default function InternalPage({events}) {
   const route = useRouter()
   const loggedIn = useUser().status === SUCCESS

   return loggedIn ? (
      <div className="internal-page-wrapper">
         HI from internal
         {/*{posts.map((item ) =>*/}
         {/*   <div key={item.id}>{item.title}</div>*/}
         {/*)}*/}
      </div>
   ) : (
      <div>Please login to view this page!!!</div>
   )
}
