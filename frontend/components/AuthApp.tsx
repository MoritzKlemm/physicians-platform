import Footer from "../components/Footer";
// @ts-ignore
import { NavComponent } from "./NavbarCustom";
import { useUser } from "../context/UserProvider";
//TODO: Optimize loading by setting React.lazy for authenticated users
// const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))

export const AuthApp = ({Components, props}) => {
   const user = useUser()
   return user.user ? (
      <div className="page-container">
         <NavComponent auth={true} />
         <div style={{paddingBottom: 25}}>
            <Components {...props} />
         </div>
         <Footer />
      </div>
   ) : (
      <div className="page-container">
         <NavComponent auth={false} />
         <div>
            <Components {...props} />
         </div>
         <Footer />
      </div>
   )
}
