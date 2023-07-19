import axios from "axios";
import { useContext, useEffect, useState } from "react";
import RoomsCard from "../components/RoomsCard";
import { AuthContext } from "../context/auth.context";

function RoomsPage() {
  const {user} = useContext(AuthContext);

  const API_URL = "http://localhost:5005";
  const[rooms, setRooms] = useState([]);

  const storedToken = localStorage.getItem("authToken")

    useEffect(() => {
      const fetchingTheRooms = () => {
        axios.get(`${API_URL}/api/rooms`, {headers: {Authorization: `Bearer ${storedToken}`}} )
          .then(response => {
            setRooms(response.data);
          })
          .catch(e => console.log("failed to get the rooms", e));
      };

      fetchingTheRooms();
    }, [])

    if(!user) {
      return <p>Loading...</p>
    } else {
      const userRooms = rooms.filter(room => room.roomOwner._id === user._id)
      return(
        <div>
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