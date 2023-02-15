import React, {useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'

export const PENDING = 'PENDING'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'

interface InitAuthState {
   status: typeof PENDING | typeof SUCCESS | typeof ERROR
   error: string | null
   user: any
}

const AuthContext = React.createContext({
   login: null,
   logout: null,
   register: null,
   state: {
      status: PENDING,
      error: null,
      user: null
   }
})
const AuthProvider = (props) => {
   const router = useRouter()
   const [state, setState] = useState<InitAuthState>({
      status: PENDING,
      error: null,
      user: null
   })

   const getLocalStorageAndPass = () => {
      const data = localStorage.getItem('user-token-strapi')
      if (data) {
         setState({status: SUCCESS, user: JSON.parse(data), error: null})
      } else {
      }
   }
   const login = async (identifier, password) => {
      try {
         //TODO: change to env variable
         const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`, {
            identifier: identifier,
            password: password
         })
         if (response.data) {
            const stringData = JSON.stringify(response.data)
            setState({status: SUCCESS, user: response.data.user, error: null})
            return true
         }
      } catch (error) {
         setState({status: ERROR, user: null, error: error})
         return false
      }
   }
   const register = () => {}
   const logout = () => {
      localStorage.removeItem('user-token-strapi')
   }

   React.useEffect(() => {
      getLocalStorageAndPass()

      //   .then(
      //    (user) => setState({status: SUCCESS, error: null, user}),
      //    (error) => setState({status: ERROR, error, user: null})
      // )
   }, [])

   return <AuthContext.Provider value={{state, login, register, logout}} {...props} />
}
const useAuth = () => React.useContext(AuthContext)

export {AuthProvider, useAuth}
