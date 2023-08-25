import axios from "axios";
import { useState } from "react";

function AddPartnerCard({roomId}) {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const [partner, setPartner] = useState();
   

  const handleAddPartner = (e) => {
    e.preventDefault();

    const newPartner = {
      partner,
      roomId
    };

    axios.post(`${API_URL}/api/rooms/${roomId}/partners`, newPartner, {headers: {Authorization: `Bearer ${storedToken}`}} )
      .then(response => {
        window.location.reload();
        setPartner("")
      })
      .catch(e => console.log("failed to add the new partner"))
  };

  return(
    <form onSubmit={handleAddPartner} className="form-add-partner">
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