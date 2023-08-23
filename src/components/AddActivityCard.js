import axios from "axios";
import { useState } from "react";

function AddActivityCard({roomId}) {
  const API_URL = "http://localhost:5005";
  
  const[activity, setActivity] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const handleSubmitNewActivity = (e) => {
    e.preventDefault();

      const newActivity = {
      activity,
      roomId
    }

    axios.post(`${API_URL}/api/rooms/${roomId}/activities`, newActivity, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => {
        window.location.reload();
        setActivity("");
      })
      .catch(e => console.log("failed to create new activity", e));
  }


  return(
    <div>
      <form onSubmit={handleSubmitNewActivity} className="add-activity-form">
        <label>List</label>
        <input 
          type="text"
          name="activity"
          value={activity}
          onChange={e => setActivity(e.target.value)}
        />

        <button type="submit">Add List</button>
      </form>
    </div>
  );
};

export default AddActivityCard;