import { Link } from "react-router-dom";

function MyHomePage () {

  return(
    <div className="myhome-page">
        <Link to="/rooms">My Room</Link>
    </div>
  )
};

export default MyHomePage;