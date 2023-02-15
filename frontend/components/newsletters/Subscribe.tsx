import React, {useEffect, useState} from 'react'
import {subscriptionAPI} from '../../lib/api'
import {Alert} from '@material-ui/lab'
import {isEmpty} from 'lodash'

export const Subscribe = () => {
   const handleFormSubmit = (e) => {
      e.preventDefault()
      subscriptionAPI(state).then((response) => {
         if (response.data.status == 400) {
            setResponseMessage({
               status: 400,
               message:
                  'Thank you for subscribing, but the entered email is already receiving our newsletters.'
            })
         } else if (response.data.id) {
            setResponseMessage({
               status: 200,
               message:
                  'Thank you for subscribing to our newsletter! Please check your inbox and confirm the email!'
            })
         }
      })
   }
   const [message, setResponseMessage] = useState(null)

   const [state, setState] = useState('')
   function handleChange(event) {
      setState(event.target.value)
   }

   useEffect(() => {
      if (state == '') {
         setResponseMessage(null)
      }
   }, [state])
   return (
      <div className="gen-wrapper-newsletter newsletters-recent-editorial-background">
         <div className="nls-outer-box">
            <form className="nls-form" onSubmit={handleFormSubmit}>
               <div className="row">
                  <div className="col-8 p-0">
                     <input
                        value={state}
                        onChange={handleChange}
                        className="nls-input"
                        type="email"
                        placeholder="your@email.edu"
                        aria-describedby="emailHelp"
                     />
                  </div>
                  <div className="col-4 p-0">
                     <button type="submit" className="nls-button">
                        subscribe
                     </button>
                  </div>
               </div>
               <div className="row">
                  {!isEmpty(message) ? (
                     message.status == 200 ? (
                        <Alert style={{width: '100%', fontSize: 15}} severity="success">
                           {message.message}
                        </Alert>
                     ) : (
                        <Alert style={{width: '100%', fontSize: 15}} severity="warning">
                           {message.message}
                        </Alert>
                     )
                  ) : null}
               </div>
            </form>
         </div>
      </div>
   )
}
