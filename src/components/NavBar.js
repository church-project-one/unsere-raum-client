import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function NavBar() {
  const {isLoggedIn, logOutUser, user} = useContext(AuthContext);

  return(
    <div className="div-navbar">
      <nav>        
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
    </div>
  )
};

export default NavBar;