import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {

  const API_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[errorMessage, setErrorMessage] = useState(undefined);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const signUpSubmit = (e) => {
    e.preventDefault();
    const requestSignUpBody = {name, email, password};

    axios.post(`${API_URL}/auth/signup`, requestSignUpBody)
      .then(response => {navigate("/login")})
      .catch(e => {
        console.log("failed to sign up", e);
        setErrorMessage(e.response.data.message);
      });
  };

  return(
    <div className="login-signup-div">
      <h1>Sign Up</h1>
      <form onSubmit={signUpSubmit}>
        <label>Name:</label>
        <input 
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />

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
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}

      <p>If you have account</p>
      <Link to="/login">Login</Link>
    </div>
  )
};

export default SignUp;