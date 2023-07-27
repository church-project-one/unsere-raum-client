import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function NavBar() {
  const {isLoggedIn, logOutUser, user} = useContext(AuthContext);

  const toggleHamburgerMenu = () => {
    const navbarElement = document.getElementById("navbar");
          navbarElement.classList.toggle("active");
    
    var hamburgerMenu = document.getElementById("hamburger-menu");
        hamburgerMenu.classList.toggle("active");
  }


  return(
      <header>
        <input type="checkbox" id="input-hamburger-menu"/>
        <div id="hamburger-menu" onClick={toggleHamburgerMenu}>
          <span className="top-span span-hamburger"></span>
          <span className="middle-span span-hamburger"></span>
          <span className="bottom-span span-hamburger"></span>
        </div>
        <nav id="navbar">
          <Link to="/feeds">Feeds</Link>
          {!isLoggedIn && (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/myhome">My Home</Link>
            <Link to={`/profile/${user._id}`}>Profile</Link>
            <Link onClick={logOutUser}>Log Out</Link>
          </>
        )}
        </nav>
      </header>
  )
};

export default NavBar;