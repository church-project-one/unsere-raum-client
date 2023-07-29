import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditResponsePage() {
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  const [response, setResponse] = useState();
  const [rating, setRating] = useState();
  const [picture, setPicture] = useState();

  const {responseId} = useParams();

  const fetchResponse = () => {
    axios.get(`${API_URL}/api/responses/${responseId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => console.log(response.data))
      .catch(e => console.log("failed to fetch the responses", e));
  };

  useEffect(() => {
    fetchResponse();
  }, [])

  const upadateResponseHandle = () => {

    axios.put()
  }

  return(
    <div>
      <h1>Hi from edit response</h1>
    </div>
  );
};

export default EditResponsePage;