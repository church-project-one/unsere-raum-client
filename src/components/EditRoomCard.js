import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRoomCard() {
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  const {roomId} = useParams();
  const navigate = useNavigate()

  const[title, setUpdateTitle] = useState("");

  useEffect(() => {
    const fetchingTheRooms = () => {
      axios.get(`${API_URL}/api/rooms/${roomId}`, {headers: {Authorization: `Bearer ${storedToken}`}} )
        .then(response => {
          const title = response.data.title
          setUpdateTitle(title);
        })
        .catch(e => console.log("failed to get the rooms", e));
    };

    fetchingTheRooms();
  }, [])

  const EditRoomHandle = () => {

    const updateRoom = {
      title
    }

    axios.put(`${API_URL}/api/rooms/${roomId}`, updateRoom, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(() => {
        alert("you have succeeded updating the room");
        window.location.reload();
      })
      .catch(e => console.log("failed to update", e))
  }
  
  return(
    <div className="form-edit-room-container">
      <form onSubmit={EditRoomHandle}>
        <label>Title</label>
          <input 
            type="text"
            name="title"
            value={title}
            onChange={e => setUpdateTitle(e.target.value)}
          />

          <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditRoomCard;