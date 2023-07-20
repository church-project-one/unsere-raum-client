import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddActivityCard({roomId}) {
  const API_URL = "http://localhost:5005";
  
  const[date, setDate] = useState("");
  const[hour, setHour] = useState("");
  const[activity, setActivity] = useState("");
  const[leader, setLeader] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const handleSubmitNewActivity = (e) => {
    e.preventDefault();

      const newActivity = {
      date,
      hour,
      activity,
      leader,
      roomId
    }

    axios.post(`${API_URL}/api/rooms/${roomId}/activities`, newActivity, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => {
        window.location.reload();
        setDate("");
        setHour("");
        setActivity("");
        setLeader("");
      })
      .catch(e => console.log("failed to create new activity", e));
  }


  return(
    <div>
      <form onSubmit={handleSubmitNewActivity} className="add-activity-form">
        <label>Date</label>
        <input 
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <label>Hour</label>
        <input 
          type="text"
          name="hour"
          value={hour}
          onChange={e => setHour(e.target.value)}
        />

        <label>Activity</label>
        <input 
          type="text"
          name="activity"
          value={activity}
          onChange={e => setActivity(e.target.value)}
        />

        <label>Leader</label>
        <input 
          type="text"
          name="leader"
          value={leader}
          onChange={e => setLeader(e.target.value)}
        />

        <button type="submit">Create Activity</button>
      </form>
    </div>
  );
};

export default AddActivityCard;