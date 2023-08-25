import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import EditRoomCard from "../components/EditRoomCard";
import AddPartnerCard from "../components/AddPartnerCard";

function RoomPageDetails() {

  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const {roomId} = useParams();

  const [room, setRoom] = useState("");
  const [activities, setActitivities] = useState([]);
  const [displayUpdateForm, setDisplayUpdateForm] = useState("");


  const displayUpdateFormHandle = () => {
    setDisplayUpdateForm(true);
  }

  const hiddenFormUpdateHandle = () => {
    setDisplayUpdateForm(false);
  }

  const fetchTheRoomDetails = () => {
    axios.get(`${API_URL}/api/rooms/${roomId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        setRoom(response.data);
        setActitivities(response.data.activities);
      })
      .catch(e => console.log("failed to fetch the room details", e))
  };

  const fetchMyPartners = () => {
    axios.get(`${API_URL}/api/partners`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {})
      .catch(e => console.log("error to fetch the partners", e))
  };

  const deleteRoomHandle = () => {
    axios.delete(`${API_URL}/api/rooms/${roomId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => navigate("/myhome"))
      .catch(e => console.log("failed to delete", e));
  };

  const toggleAddPartner = () => {
    const addPartnerFormElement = document.querySelector(".form-add-partner")
          addPartnerFormElement.classList.toggle("active");
  }

  useEffect(() => {
    fetchTheRoomDetails();
    fetchMyPartners();
  }, []);

  return (
    <div className="room-details-container">
      <h1>{room.title}'s Room</h1>
      <span onClick={toggleAddPartner}>+</span>
      
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>To do List</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((element, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{element.activity}</td>
              <td><Link to={`/activities/${element._id}`}>Details</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={displayUpdateFormHandle}>Update Room</button>
      {displayUpdateForm 
        ? <div className="edit-room-card">
            <EditRoomCard />
            <button onClick={hiddenFormUpdateHandle}>Cancel</button> 
          </div>
        : <></>
      }
      <button onClick={deleteRoomHandle}>Delete Room</button>
      <Link to={`/add-partner/${roomId}`} className="add-partner-link">Add Partner +</Link>
      <div>
        <h3>My Partners</h3>
      </div>
    </div>
  )
};

export default RoomPageDetails;