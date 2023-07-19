import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import EditRoomCard from "../components/EditRoomCard";
import AddActivityCard from "../components/AddActivityCard";

function RoomPageDetails() {

  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const {roomId} = useParams();

  const [room, setRoom] = useState("");
  const [activities, setActitivities] = useState([]);
  const [displayUpdateForm, setDisplayUpdateForm] = useState("");
  const [displayAddActivity, setDisplayAddActivity] = useState(false);

  const displayUpdateFormHandle = () => {
    setDisplayUpdateForm(true);
  }

  const hiddenFormUpdateHandle = () => {
    setDisplayUpdateForm(false);
  }

  const fetchTheRoomDetails = () => {
    axios.get(`${API_URL}/api/rooms/${roomId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        setRoom(response.data.title);
        setActitivities(response.data.activities);
      })
      .catch(e => console.log("failed to fetch the room details", e))
  };

  const deleteRoomHandle = () => {
    axios.delete(`${API_URL}/api/rooms/${roomId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => navigate("/rooms"))
      .catch(e => console.log("failed to delete", e));
  };

  const displayAddActivityForm = () => {
    setDisplayAddActivity(true)
  };

  const hiddenDisplayAddActivityForm = () => {
    setDisplayAddActivity(false)
  };

  useEffect(() => {
    fetchTheRoomDetails();
  }, []);

  return (
    <div className="room-details-container">
      <h1>{room}'s Room</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Activity</th>
            <th>Leader</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((element, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{new Date(element.date).toLocaleDateString("en", {day: "2-digit", month: "long", year: "numeric"})}</td>
              <td>{element.hour}</td>
              <td>{element.activity}</td>
              <td>{element.leader}</td>
              <td><Link to={`/activities/${element._id}`}>Details Activity</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={displayUpdateFormHandle}>Update Class</button>
      {displayUpdateForm 
        ? <div className="edit-room-card">
            <EditRoomCard />
            <button onClick={hiddenFormUpdateHandle}>Cancel</button> 
          </div>
        : <></>
      }

      <button onClick={displayAddActivityForm}>Add Activity</button>
      {displayAddActivity 
        && <div className="add-activity-from-room-page-details">
              <AddActivityCard />
              <button onClick={hiddenDisplayAddActivityForm}>Cancel</button> 
            </div>
      }    
      <button onClick={deleteRoomHandle}>Delete Room</button>
    </div>
  )
};

export default RoomPageDetails;