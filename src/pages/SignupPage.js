import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {

  const API_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[street, setStreet] = useState("");
  const[number, setNumber] = useState("");
  const[postalCode, setPostalCode] = useState("");
  const[city, setCity] = useState("");
  const[nationality, setNationality] = useState("");
  const[picture, setPicture] = useState(null);
  const[errorMessage, setErrorMessage] = useState(undefined);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleStreet = (e) => setStreet(e.target.value);
  const handleNumber = (e) => setNumber(e.target.value);
  const handlePostalCode = (e) => setPostalCode(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleNationality = (e) => setNationality(e.target.value);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const signUpSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("street", street);
    formData.append("number", number);
    formData.append("postalCode", postalCode);
    formData.append("city", city);
    formData.append("nationality", nationality);
    formData.append("picture", picture);

    axios.post(`${API_URL}/auth/signup`, formData)
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

        <label>Street:</label>
        <input 
          type="text"
          name="street"
          value={street}
          onChange={handleStreet}
        />

        <label>Number:</label>
        <input 
          type="number"
          name="number"
          value={number}
          onChange={handleNumber}
        />

        <label>Postal Code:</label>
        <input 
          type="text"
          name="postalCode"
          value={postalCode}
          onChange={handlePostalCode}
        />

        <label>City:</label>
        <input 
          type="text"
          name="city"
          value={city}
          onChange={handleCity}
        />

        <label>Nationality:</label>
        <input 
          type="text"
          name="nationality"
          value={nationality}
          onChange={handleNationality}
        />

        <label>Picture:</label>
        <input 
          type="file"
          name="picture"
          accept="image/*"
          onChange={handleFileUpload}
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