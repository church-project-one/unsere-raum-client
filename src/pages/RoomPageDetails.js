import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import EditRoomCard from "../components/EditRoomCard";

function RoomPageDetails() {

  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const {roomId} = useParams();

  const [rooms, setRooms] = useState("");
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
        setRooms(response.data.title)
        setActitivities(response.data.activities);
      })
      .catch(e => console.log("failed to fetch the room details", e))
  };

  const deleteRoomHandle = () => {
    axios.delete(`${API_URL}/api/rooms/${roomId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => navigate("/rooms"))
      .catch(e => console.log("failed to delete", e));
  };

  useEffect(() => {
    fetchTheRoomDetails();
  }, []);

  return (
    <div className="room-details-container">
      <h1>{rooms}'s Room</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Activity</th>
            <th>Leader</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((element, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <th>{new Date(element.date).toLocaleDateString("en", {day: "2-digit", month: "long", year: "numeric"})}</th>
              <th>{element.hour}</th>
              <th>{element.activity}</th>
              <th>{element.leader}</th>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={displayUpdateFormHandle}>Update Form</button>
      {displayUpdateForm 
        ? <div className="edit-room-card">
            <EditRoomCard />
            <button onClick={hiddenFormUpdateHandle}>Cancel</button> 
          </div>
        : <></>
      }

      <button onClick={deleteRoomHandle}>Delete Room</button>
    </div>
  )
};

export default RoomPageDetails;