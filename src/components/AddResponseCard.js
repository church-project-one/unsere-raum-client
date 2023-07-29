import axios from "axios";
import { useState } from "react";

function AddResponseCard ({feedId}) {
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  const [response, setResponse] = useState();
  const [rating, setRating] = useState();
  const [picture, setPicture] = useState();

  const uploadImage = (file) => {
    return axios.get(`${API_URL}/api/upload`, file)
      .then(response => response.data)
      .catch(e => console.log(e));
  };

  const handleImageUpload = (e) => {
    const uploadDataImage = new FormData();
    uploadDataImage.append("picture", e.target.files[0]);

    uploadImage(uploadDataImage)
      .then(response => setPicture(response.picture))
      .catch(e => console.log("error adding an image file", e));

  };

  const postNewResponseHandle = (e) => {
    e.preventDefault();

    const newResponseBody = {
      response,
      rating,
      picture
    }

    axios.post(`${API_URL}/api/feeds/${feedId}/responses`, newResponseBody, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        window.location.reload();

        setResponse("");
        setRating("");
        setPicture("");
      });
  };

  return (
    <form onSubmit={postNewResponseHandle} className="form-post-new-response">

      <label>Response</label>
      <input 
        type="text"
        name="response"
        value={response}
        onChange={e => setResponse(e.target.value)}
      />

      <label>Rating</label>
      <input 
        type="text"
        name="rating"
        value={rating}
        onChange={e => setRating(e.target.value)}
      />

      <label>Picture</label>
      <input 
        type="file"
        name="picture"
        onChange={e => handleImageUpload(e)}
      />
      <button type="submit">Response</button>
    </form>
  );

};

export default AddResponseCard;