import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddPartnerCard() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const [partner, setPartner] = useState();
  const {roomId} = useParams();

  const navigate = useNavigate();

  const handleAddPartner = (e) => {
    e.preventDefault();

    const newPartner = {
      partner,
      roomId
    };

    axios.post(`${API_URL}/api/rooms/${roomId}/partners`, newPartner, {headers: {Authorization: `Bearer ${storedToken}`}} )
      .then(response => {
        setPartner("")
        navigate(-1)
        alert("succes to add new member")
      })
      .catch(e => console.log("failed to add the new partner"))
  };

  console.log(roomId)
  return(
    <form onSubmit={handleAddPartner} className="form-add-partner">
      <label><h3>Partner's Id</h3></label>
      <input 
        type="text"
        name="partner"
        value={partner}
        onChange={e => setPartner(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPartnerCard;