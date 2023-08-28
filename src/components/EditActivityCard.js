import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditActivityCard() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const {activityId} = useParams();
  const[date, setDate] = useState("");
  const[activity, setActivity] = useState("");

  console.log(activityId)

  const fetchOneActivity = () => {
    axios.get(`${API_URL}/api/activities/${activityId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => {
        setDate(response.data)
        setActivity(response.data.activity);
      })
      .catch(e => console.log("failed to fetch the activity id", e))
  };

  const updateActivityHandle = () => {
    const updateActivityBody = { activity }

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
    <div id="update-activity-form">
      <form onSubmit={updateActivityHandle}>
        <label>Created At:</label>
        <p>{new Date(date.createdAt).toDateString("en", {day: "2-digit", month: "long", year: "numeric"})}</p>

        <label>Activity:</label>
        <input 
          type="text"
          name="activity"
          value={activity}
          onChange={e => setActivity(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      <button onClick={deleteActivityHandle}>Delete Activity</button>
    </div>
  )
};

export default EditActivityCard;