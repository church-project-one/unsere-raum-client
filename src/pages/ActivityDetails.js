import axios from "axios";
import { useParams } from "react-router-dom";

function ActivityDetails() {
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");

  const {activityId} = useParams();

  const fetchActivityDetails = () => {
    axios.get(`${API_URL}/api/`)
  }

  return(
    <div>

    </div>
  );
};

export default ActivityDetails;