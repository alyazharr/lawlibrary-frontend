import Header from "./Header"
import { Outlet } from "react-router"
import '../Styles/Layout.css'
const Layout = () => {
    return (
    <div className="main">
 
        <Header/>
        <Outlet/>
  

    </div>
      
    )
  }
  
  export default Layout