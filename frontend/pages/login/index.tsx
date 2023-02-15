import React from 'react'
import {LoginComponent} from '../../components/login/LoginComponent'

interface LoginPageType {
   currentState: any
}

const LoginPage: React.FC<LoginPageType> = ({currentState}) => {
   return (
      <div>
         <LoginComponent />
      </div>
   )
}

export default LoginPage
