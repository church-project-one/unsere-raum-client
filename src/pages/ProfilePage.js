import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProfilePage() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const [profile, setProfile] = useState([]);
  const {profileId} = useParams("")

  const storedToken = localStorage.getItem("authToken");

  const fetchProfile = () => {
    axios.get(`${API_URL}/api/users/${profileId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => setProfile(response.data))
      .catch(e => console.log("failed to fetch the profile id", e))
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return(
    <div id="profile">
      <div>
        {profile.picture ? <img src={profile.picture} alt="img"/> : <>No Profile Picture</>}
      </div>
      <table id="profile-table">
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{profile.name}</td>
          </tr>
          <tr>
            <td>Id:</td>
            <td>{profile._id}</td>
          </tr>
          <tr>
            <td>Nationality:</td>
            <td>{profile.nationality}</td>
          </tr>
          <tr>
            <td>Street:</td>
            <td>{profile.street}</td>
          </tr>
          <tr>
            <td>Number:</td>
            <td>{profile.number}</td>
          </tr>
          <tr>
            <td>Postal Code:</td>
            <td>{profile.postalCode}</td>
          </tr>
          <tr>
            <td>City:</td>
            <td>{profile.city}</td>
          </tr>
          <tr>
            <td>Join:</td>
            <td>{new Date(profile.createdAt).toLocaleDateString("en", {day: "2-digit", month: "long", year: "numeric", hour: "numeric"})}</td>
          </tr>
        </tbody>
      </table>
      <Link to={`/edit-profile/${profileId}`} className="manage-account">Manage Account</Link>

    </div>
  );
};

export default ProfilePage;