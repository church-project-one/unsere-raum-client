import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditActivityCard() {
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const {activityId} = useParams();
  const[date, setDate] = useState("");
  const[hour, setHour] = useState("");
  const[activity, setActivity] = useState("");
  const[leader, setLeader] = useState("");

  const fetchOneActivity = () => {
    axios.get(`${API_URL}/api/activities/${activityId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => {
        const formattedDate = response.data.date.substring(0, 10);
        setDate(formattedDate);
        setHour(response.data.hour);
        setActivity(response.data.activity);
        setLeader(response.data.leader);
      })
      .catch(e => console.log("failed to fetch the activity id", e))
  };

  const updateActivityHandle = () => {
    const updateActivityBody = {
      date,
      hour,
      activity,
      leader
    }

    axios.put(`${API_URL}/api/activities/${activityId}`, updateActivityBody, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(() => {
        navigate(-1)
      })
      .catch(e => console.log("failed to update the activity", e));
  };

  const deleteActivityHandle = () => {
    axios.delete(`${API_URL}/api/activities/${activityId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => {
        alert(`you have removed the activitiy ${response.data._id}`);
        navigate(-1);
      })
      .catch(e => console.log("failed to delete the activity", e));
  };

  useEffect(() => {
    fetchOneActivity();
  }, [])

  return(
    <div>
        <form onSubmit={updateActivityHandle}>
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

        <button type="submit">Update</button>
      </form>
      <button onClick={deleteActivityHandle}>Delete Activity</button>
    </div>
  )
};

export default EditActivityCard;