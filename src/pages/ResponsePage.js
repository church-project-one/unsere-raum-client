import axios from "axios";
import { useEffect } from "react";

function ResponsePage() {
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");

  // const fetchResponse = () => {
  //   axios.get(`${API_URL}/api/responses`, {headers: {Authorization: `Bearer ${storedToken}`}})
  //     .then(response => console.log(response.data))
  //     .catch(e => console.log("failed to fetch the responses", e));
  // };

  // useEffect(() => {
  //   fetchResponse();
  // }, [])

  return(
    <div>
    </div>
  );
};

export default ResponsePage;