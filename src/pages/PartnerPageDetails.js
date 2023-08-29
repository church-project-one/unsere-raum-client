import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PartnerPageDetails() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const {partnerId} = useParams();
  const [partner, setPartner] = useState("")
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPartnerId = () => {
      axios.get(`${API_URL}/api/partners/${partnerId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
        .then(response => {
          setPartner(response.data._id);
        })
        .catch(e => console.log("failed to fetch the partner Id"))
    };

    fetchPartnerId();
  }, []);

  const handleDeletePartner = () => {
    axios.delete(`${API_URL}/api/partners/${partnerId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(() => {
        alert("success to delete");
        navigate(-1)
      })
      .catch(e => console.log("failed to delete", e))
  };

  return(
    <div id="partner-id">
      <label>Partner's Id</label>
      <input 
        type="text"
        name="partner"
        value={partner}
        onChange={e => setPartner(e.target.value)}
      />
      <button onClick={handleDeletePartner}>Delete</button>
    </div>
  )
};

export default PartnerPageDetails;