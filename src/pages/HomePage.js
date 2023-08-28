import { Link } from "react-router-dom";

function HomePage() {
  return(
    <div id="home-page">
      <h2>Feel free to make your own to do list</h2>
      <p>Please, sign up if you don't have an account or login if you do!</p>
      
      <Link to="/signup">Sign Up!</Link> <p> or </p>
      <Link to="/Login">Login!</Link>
    </div>
  );
};

export default HomePage;