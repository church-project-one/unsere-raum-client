import { Link } from "react-router-dom";
import roomIcon from "../images/roomIcon.png";
import roomDetails from "../images/roomDetails.png";

function HomePage() {
  return(
    <div id="home-page">
      <p className="description">This is a website application to help people make their own room,<br></br>
          and inside the room they can
          add activities according to its needs.
      </p>
      <br></br>
      <br></br>
      <div className="images">

        <img src={roomIcon} alt="room-icon-img"/>
        <br></br>
        <br></br>
        <img src={roomDetails} alt="room-icon-img"/>
      </div>
      <p>Please, sign up if you don't have an account or login if you do!</p>
      
      <Link to="/signup">Sign Up!</Link> <p> or </p>
      <Link to="/Login">Login!</Link>
    </div>
  );
};

export default HomePage;