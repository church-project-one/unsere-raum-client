import axios from "axios";
import { useParams } from "react-router-dom";

function ActivityDetails() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
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