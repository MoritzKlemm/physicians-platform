import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {useAuth} from '../../context/AuthProvider'

export const LoginComponent = () => {
   const [userName, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [warning, setWarning] = useState('')

   const test = useAuth()
   const router = useRouter()
   return (
      <div>
         <div className="log-main-div log-gen-wrapper">
            <div className="log-outer-box">
               <form
                  className="log-form"
                  onSubmit={(event) => {
                     event.preventDefault()
                     test.login(userName, password).then((response) => {
                        response === true
                           ? router.push('/internal')
                           : setWarning('Credentials wrong. Retry!')
                     })
                  }}
               >
                  <input
                     className="log-input-email"
                     type="text"
                     placeholder="email"
                     value={userName}
                     onChange={(event) => setUsername(event.target.value)}
                  />
                  <input
                     className="log-input-password"
                     type="text"
                     placeholder="password"
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                  />
                  <div className="alert-warning">{warning}</div>
                  <input className="log-input-button" type="submit" value="login" />
               </form>
               <div className="log-remember-forgot-wrapper">
                  <form className="log-remember-forgot-form">
                     <input type="checkbox" />
                     <span className="log-remember-me">Remember me</span>
                  </form>
                  <a className="log-forgot-pass" href="#">
                     Forgot Password?
                  </a>
               </div>
            </div>
         </div>
      </div>
   )
}
