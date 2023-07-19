import axios from "axios";
import { useEffect, useState } from "react";
import RoomsCard from "../components/RoomsCard";
import { Link } from "react-router-dom";
import RoomPageDetails from "./RoomPageDetails";

function RoomsPage() {
  const API_URL = "http://localhost:5005";
  const[rooms, setRooms] = useState([]);

  const storedToken = localStorage.getItem("authToken")

    useEffect(() => {
      const fetchingTheRooms = () => {
        axios.get(`${API_URL}/api/rooms`, {headers: {Authorization: `Bearer ${storedToken}`}} )
          .then(response => {
            setRooms(response.data);
            console.log(response.data)
          })
          .catch(e => console.log("failed to get the rooms", e));
      };

      fetchingTheRooms();
    }, [])
    
    if(rooms === undefined) {
      <p>Loading...</p>
    } else {
      return(
        <div>
          <div className="rooms-card">
            {rooms.map(room => (
              <RoomsCard key={room._id} {...room} activities={room.activities}/>
            ))}
          </div>
        </div>
      );
    };
    
};

export default RoomsPage;