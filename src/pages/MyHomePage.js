import { Link } from "react-router-dom";

function MyHomePage () {

  return(
    <div className="myhome-page">
      <div className="myhome-page-navbar">
        <Link to="/rooms">My Room</Link>
      </div>
    </div>
  )
};

export default MyHomePage;
