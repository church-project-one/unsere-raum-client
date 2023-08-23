import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoomsGroupCard from "../components/RoomsGroupCard";
import { AuthContext } from "../context/auth.context";

function MyLivingRoom() {
  const { user } = useContext(AuthContext);
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  const [filterRoom, setFilterRoom] = useState([]);
  const [roomOwnerId, setRoomOwnerId] = useState("");
  
  useEffect(() => {
    const fetchRooms = () => {
      axios.get(`${API_URL}/api/rooms`, {headers: {Authorization: `Bearer ${storedToken}`}})
        .then(response => {
          setRoomOwnerId(response.data.map(element => element.roomOwner._id));
          setFilterRoom(response.data.filter(element => element.partners.length > 0))
        })
        .catch(e => console.log("failed to fetch the rooms" ,e));
    };

    fetchRooms();
  }, []);

  console.log(filterRoom)
  
  return(
    <div className="rooms-page">
      <div className="myhome-page-nav">
        <div id="myhome-page-nav-a">
          <Link to="/myhome">Room</Link>
          <Link to="/living-room">Living Room</Link>    
        </div>
      </div>
    
      <div className="rooms-card">
        {filterRoom
          ? filterRoom.map(element => (
            <div key={element._id}>
              <RoomsGroupCard key={element.title} {...element}/>
            </div>
          )) 
          : <></>
        }
      </div>
    </div>
  );
};

export default MyLivingRoom;