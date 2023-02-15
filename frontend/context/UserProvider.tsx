import React from 'react'
import {PENDING, useAuth} from './AuthProvider'

const UserContext = React.createContext({
   status: PENDING,
   error: null,
   user: null
})

const UserProvider = (props) => {
   props
   const authState = useAuth()

   return <UserContext.Provider value={useAuth().state} {...props} />
}
//TODO: Default FULL ACCESS -->change
const useUser = () => React.useContext(UserContext)

export {UserProvider, useUser}
