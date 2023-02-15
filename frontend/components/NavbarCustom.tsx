import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo_invert_1.png'
import {useAuth} from '../context/AuthProvider'
import {useRouter} from 'next/router'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
   buttonRoot: {
      fontSize: 14,
      letterSpacing: 2.2,
      marginLeft: theme.spacing(3),
      fontWeight: 400,
      color: 'white',
      '&:hover': {
         backgroundColor: theme.palette.primary.main
      }
   },

   labelRoot: {
      maxHeight: 35
   }
}))

interface NavbarType {
   auth: boolean
}
export const NavComponent: React.FC<NavbarType> = ({auth}) => {
   const authTabs = [
      {id: 1, name: 'HOME', slug: ''},
      {id: 2, name: 'ANNOUNCEMENTS', slug: 'announcements'},
      {id: 3, name: 'NEWSLETTERS', slug: 'newsletters'},
      {id: 4, name: 'EVENTS', slug: 'events'},
      {id: 5, name: 'ABOUT US', slug: 'about'},
      {id: 6, name: 'INTERNAL', slug: 'internal'},
      {id: 7, name: 'LOG OUT', slug: 'logout'}
   ]

   const noAuthTabs = [
      {id: 1, name: 'HOME', slug: ''},
      {id: 2, name: 'ANNOUNCEMENTS', slug: 'announcements'},
      {id: 3, name: 'NEWSLETTERS', slug: 'newsletters'},
      {id: 4, name: 'EVENTS', slug: 'events'},
      {id: 5, name: 'ABOUT US', slug: 'about'},
      {id: 6, name: 'LOG IN', slug: 'login'}
   ]

   const classes = useStyles()
   const test = useAuth()
   const router = useRouter()

   return (
      <Navbar collapseOnSelect expand="xl" sticky="top" className="navbar-expand-xl">
         {/* displayed when screen size is between 1200px and 576px */}

         <Link href="/">
            <Navbar.Brand className="m-0">
               <div className="navbar-logo">
                  <Image src={logo} className="navbar-logo" />
               </div>
               <div className="nav-logo-text-item">
                  <span>Beam</span>
                  <span>Dynamics</span>
                  <span>Panel</span>
               </div>
            </Navbar.Brand>
         </Link>

         {/* displayed when screen size is >= 1200 */}
         <Link href="https://icfa.hep.net/">
            <a className="navbar-panel-description-wrapper-A" target="_blank">
               <span className="navbar-panel-description-A">A Panel of the </span>
               <span className="navbar-panel-description-A">International Committee of </span>
               <span className="navbar-panel-description-A">Future Accelerators</span>
            </a>
         </Link>

         {/* burger */}
         <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="navbar-burger"
            id="toggle-connection"
         />

         <Link href="https://icfa.hep.net/">
            <a className="navbar-panel-description-wrapper-B">
               <p className="navbar-panel-description-B">
                  A Panel of the International Committee of Future Accelerators
               </p>
            </a>
         </Link>

         {/* collapses */}
         <Navbar.Collapse
            className="justify-content-end navbar-tab-wrapper"
            id="responsive-navbar-nav"
         >
            <Nav className="me-auto navbar-tab-wrapper">
               {auth
                  ? authTabs.map((current, index) => (
                       <Link href={`/${current.slug}`} key={index}>
                          <Button disableElevation classes={{root: classes.buttonRoot}}>
                             {current.name}
                             {current.slug === 'login' ? (
                                <AccountBoxIcon
                                   className="nav-link-login-icons"
                                   fontSize={'large'}
                                />
                             ) : (
                                <></>
                             )}
                          </Button>
                       </Link>
                    ))
                  : noAuthTabs.map((current, index) => (
                       <Link href={`/${current.slug}`} key={index}>
                          <Button disableElevation classes={{root: classes.buttonRoot}}>
                             {current.name}
                             {current.slug === 'login' ? (
                                <AccountBoxIcon
                                   className="nav-link-login-icons"
                                   fontSize={'large'}
                                />
                             ) : (
                                <></>
                             )}
                          </Button>
                       </Link>
                    ))}
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   )
}
