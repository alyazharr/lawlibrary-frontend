import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/Header.css";  

function Header() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

    return (
        <header>
            <h3><a href="/">LawLibrary</a></h3>
            <nav ref={navRef}>
                <a href="/#">Profile</a>
                <a href="/#">Book Review</a>
                <a href="/#">Book Recommendation</a>
                {/* {isLoggedIn
                ? <a href="/login">Login</a>
                : <a href="/login">Logout</a>
            } */}
                
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