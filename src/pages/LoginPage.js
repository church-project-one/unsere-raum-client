import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function LoginPage() {
  const API_URL = "http://localhost:5005";

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const {storeToken, authenticateUser} = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const loginSumbit = (e) => {
    e.preventDefault();
    const requestLoginBody = {email, password};
    
    axios.post(`${API_URL}/auth/login`, requestLoginBody)
      .then(response => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/feeds")
      })
      .catch(e => {
        console.log("failed to login", e);
        setErrorMessage(e.response.data.message)
      })
  }

  return(
    <div className="login-signup-div">
      <h1>Login</h1>
      <form onSubmit={loginSumbit}>
        <label>Email:</label>
        <input 
          type="text"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}

      <p>Don't have any accout yet ?</p>
      <Link to="/signup">Sign Up</Link>
    </div>
  )
}

export default LoginPage;