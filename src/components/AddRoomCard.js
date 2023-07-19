import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRoomCard() {
  const API_URL = "http://localhost:5005";
  const navigate = useNavigate();

  const [title, setNewTitle] = useState("");
  const [description, setNewDescription] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const handleSubmitCreateNewRoom = (e) => {
    e.preventDefault();

    const requestNewRoomBody = {
      title,
      description,
    };

    axios
      .post(`${API_URL}/api/rooms`, requestNewRoomBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setNewTitle("");
        setNewDescription("");
        
        navigate("/rooms")
      })
      .catch((e) => {
        console.log("failed to create new room", e);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmitCreateNewRoom} className="new-room">
        <label><h1>Title</h1></label>
        <input 
          type="text"
          name="title"
          value={title}
          onChange={e => setNewTitle(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

    </div>
  );
}

export default AddRoomCard;
