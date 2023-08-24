import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProfileCard() {
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  const {profileId} = useParams();
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = () => {
      axios.get(`${API_URL}/api/users/${profileId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
        .then(response => {
          setName(response.data.name);
          setNationality(response.data.nationality);
          setStreet(response.data.street);
          setNumber(response.data.number);
          setPostalCode(response.data.postalCode);
          setCity(response.data.city);
        })
        .catch(e => console.log("error to fetch the profile data", e));
    };

    fetchProfileData();
  }, []);

  const updateProfileUserHandle = (e) => {
    e.preventDefault();

    const profileBody = {
      name, 
      nationality, 
      street, 
      number, 
      postalCode, 
      city
    }

    console.log(profileBody)

    axios.put(`${API_URL}/api/users/${profileId}`, profileBody, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then( response => {
        alert("you have succeeded updating the your profile")
        navigate(-1);
      })
      .catch(e => console.log("error updating the profile"))
  };

  return(
    <form onSubmit={updateProfileUserHandle} id="form-edit-profile" >
      <label>Name:</label>
      <input 
        type="text"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <label>Nationality:</label>
      <input 
        type="text"
        name="nationality"
        value={nationality}
        onChange={e => setNationality(e.target.value)}
      />

      <label>Street:</label>
      <input 
        type="text"
        name="street"
        value={street}
        onChange={e => setStreet(e.target.value)}
      />
      
      <label>Number:</label>
      <input 
        type="number"
        name="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
      />

      <label>Postal Code:</label>
      <input 
        type="number"
        name="postalCode"
        value={postalCode}
        onChange={e => setPostalCode(e.target.value)}
      />

      <label>City:</label>
      <input 
        type="text"
        name="city"
        value={city}
        onChange={e => setCity(e.target.value)}
      />

      <button type="submit">Update</button>
    </form>
  )
};

export default EditProfileCard;