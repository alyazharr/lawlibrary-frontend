import Header from "./Header"
import { Outlet } from "react-router"
import '../Styles/Layout.css'
const Layout = () => {
    return (
    <div className="layout">
 
        <Header/>
        <Outlet/>
  

    </div>
      
    )
  }
  
  export default Layout