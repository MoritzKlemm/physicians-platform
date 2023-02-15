import React from 'react'
import logo from '/Images/logo_1.png'

function Logo() {
   return (
      <div>
         <img className="nav-logo" src={logo} alt="icfa-logo" />
         <div className="nav-logo-text">
            <span className="nav-logo-text-item">BEAM</span>
            <span className="nav-logo-text-item">DYNAMICS</span>
            <span className="nav-logo-text-item">PANEL</span>
         </div>
      </div>
   )
}

export default Logo
