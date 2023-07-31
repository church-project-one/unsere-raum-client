import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function NavBar() {
  const {isLoggedIn, logOutUser, user} = useContext(AuthContext);

  const toggleHamburgerMenu = () => {
    const hamburgerElement = document.querySelector(".hamburger-menu");
    const navbarElement = document.querySelector(".navbar");

    hamburgerElement.classList.toggle("active");
    navbarElement.classList.toggle("active");
  }

  return(
      <header>
        <Link to="/">ZendDae</Link>

        <div className="hamburger-menu" onClick={toggleHamburgerMenu}>
          <span className="hamburger-icon top-line"></span>
          <span className="hamburger-icon middle-line"></span>
          <span className="hamburger-icon bottom-line"></span>
        </div>

        <nav className="navbar">
          <ul>
            {/* <li><Link to="/feeds">Feeds</Link></li> */}
            {!isLoggedIn && (
              <>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            )}

            {isLoggedIn && (
              <>
              <li><Link to="/myhome">My Home</Link></li>
                <li><Link to={`/profile/${user._id}`}>Profile</Link></li>
                <li><Link onClick={logOutUser}>Log Out</Link></li>
              </>
            )}

          </ul>
        </nav>
      </header>
  )
};

export default NavBar;