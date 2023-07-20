import axios from "axios";
import { useEffect, useState } from "react";

function AddPartnerCard({roomId}) {
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  const [partner, setPartner] = useState("");
  const [users, setUser] = useState("");
  const [myPartner, setMyPartner] = useState("");

  const addNewPartnerHandle = (e) => {
    e.preventDefault();

    const newPartner = {
      partner,
      roomId
    };

    axios.post(`${API_URL}/api/rooms/${roomId}/partners`, newPartner, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        console.log(response.data)
        setPartner("")
        alert("success to add")
      })
      .catch(e => {
        console.log("error to post the new partner", e);
        alert("failed to add")
    })
  };

  const fetchUsers = () => {
    axios.get(`${API_URL}/api/users`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        const users = response.data.map(element => element._id)
        setUser(users[1])
      })
      .catch(e => console.log("error to fetch the users"))
  };

  
  const fetchPartner = () => {
    axios.get(`${API_URL}/api/partners`, {headers: {Authorization: `Bearer ${storedToken}`}})
    .then(response => {
      const partnerId = response.data.map(element => element.partner)
    
      setMyPartner(partnerId[0])
    })
    .catch(e => console.log("faield to fetch the partners", e))
  }
  
  useEffect(() => {
    fetchUsers();
    fetchPartner();
  }, []);


  return(
    <div>
      <form onSubmit={addNewPartnerHandle}>
        <label>New Partner</label>
        <input 
          type="text"
          name="partner"
          value={partner}
          onChange={e => setPartner(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
};

export default AddPartnerCard;