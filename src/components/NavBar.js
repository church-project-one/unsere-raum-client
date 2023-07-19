import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function NavBar() {
  const {isLoggedIn, logOutUser} = useContext(AuthContext);

  return(
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/rooms" >Rooms</Link>

        {!isLoggedIn && (
        <>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link onClick={logOutUser}>Log Out</Link>
          <Link to="/create-room">New Room</Link>
        </>
      )}
      </nav>


      

    </div>
  )
};

export default NavBar;