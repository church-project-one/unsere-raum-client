import axios from "axios";
import { useContext, useEffect, useState } from "react";
import RoomsCard from "../components/RoomsCard";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function RoomsPage() {
  const {user} = useContext(AuthContext);

  const API_URL = "http://localhost:5005";
  const[rooms, setRooms] = useState([]);
  const [arrPartners, setArrPartners] = useState([])
  const [partners, setPartners] = useState([]);

  const storedToken = localStorage.getItem("authToken")

  const fetchingTheRooms = () => {
    axios.get(`${API_URL}/api/rooms`, {headers: {Authorization: `Bearer ${storedToken}`}} )
      .then(response => {
        setRooms(response.data);
        setArrPartners(response.data.map(element => element.partners))
      })
      .catch(e => console.log("failed to get the rooms", e));
    };
    
  const fetchMyPartners = () => {
    axios.get(`${API_URL}/api/partners`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => setPartners(response.data.map(element => element.partner)))
      .catch(e => console.log("error to fetch the partners", e))
  };

    useEffect(() => {
      fetchingTheRooms();
      fetchMyPartners();
    }, [])

    const isArryPartnersExist = arrPartners.filter((element) => element.length > 0)
    console.log(isArryPartnersExist)

    if(!user) {
      return <p>Loading...</p>
    } else {
      const userRooms = rooms.filter(room => room.roomOwner._id === user._id)
      return(
        <div className="rooms-page">
          <Link to="/create-room">+ New Room</Link>

          <div className="rooms-card">
            {userRooms.map(room => (
              <div key={room._id}>
                <RoomsCard key={room._id} {...room} activities={room.activities}/>
              </div>
            ))}
          </div>
          
        </div>
      );
    };
    
};

export default RoomsPage;