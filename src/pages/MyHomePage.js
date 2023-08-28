import axios from "axios";
import { useContext, useEffect, useState } from "react";
import RoomsCard from "../components/RoomsCard";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function MyHomePage () {
  const {user} = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_SERVER_URL;
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
  
    if(!user) {
      return <p className="loading-message">Loading...</p>
    } else {
      const userRooms = rooms.filter(room => room.roomOwner._id === user._id)
      return(
        <div className="rooms-page">
         <div className="myhome-page-nav">
            <div id="myhome-page-nav-a">
              <Link to="/myhome">Room</Link>
              <Link to="/living-room">Living Room</Link>
              <Link to="/create-room" className="new-room-link">+ New Room</Link>
            </div>
          </div>

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

export default MyHomePage;