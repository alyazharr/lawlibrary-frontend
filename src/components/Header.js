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
                <Link to={`/profile`}>Profile</Link>
                <a href="/#">Book Review</a>
                <a href="/#">Book Recommendation</a>
                <Link to={`/books/search`}>Book Search</Link>
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
            <div className="search-container">
                <form action="/#">
                    <input type="text" placeholder="Search.." name="search"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </header>
        


        
    );
}

export default Header;