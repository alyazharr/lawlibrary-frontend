import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/Header.css";  
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../utils/useLogout";
import { useAuth } from "../context/GlobalStates";

function Header() {
    const navRef = useRef()
    const logout = useLogout()
    const navigate = useNavigate()
    const {authState} = useAuth()

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

    const signOut = async () => {
        await logout()
        navigate('/auth/login')

        
    };

    return (
        <header>
            <h3><a href="/home">LawLibrary</a></h3>
            <nav ref={navRef}>
                { authState?.roles === 'user' ? <div>
                <Link to={`/profile`}>Profile</Link>
                <Link to={`/my-reviews`}>My Review</Link> 
                <Link to={`/reviews`}>Book Review</Link>
                <a href="/#">Book Recommendation</a>
                <Link to={`/books/search`}>Book Search</Link>
                </div>: 
                <div></div>}
                 { authState?.roles === 'admin' ? <div>
                <a href="/#">Admin Page</a>
                </div>: 
                <div></div>}
                { !authState?.username ? <div>
                    <Link to={`/auth/login`}>Login</Link>
                    <Link to={`/auth/register`}>Register</Link>
                </div>:
                <div>
                <button onClick={signOut} type="button" className="btn btn-primary">Logout</button>
                </div>
                }
    

        
                
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
        


        
    );
}

export default Header;