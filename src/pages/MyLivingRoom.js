import React from "react";
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
  const [partners, setPartners] = useState([])

  useEffect(() => {
    if (user) {
      const fetchRooms = () => {
        axios.get(`${API_URL}/api/rooms`, {headers: {Authorization: `Bearer ${storedToken}`}})
          .then(response => {
            const ownedRoomIds = response.data
            .filter(element => element.roomOwner._id === user._id)
            .map(element => element._id);
            setRoomOwnerId(ownedRoomIds);
            setFilterRoom(response.data.filter(element => element.partners.length > 0));
            const partnerArray = response.data.flatMap(element => element.partners.map(partner => partner.partner));
            const checkIfUserIdExistInPartnersArray = partnerArray.includes(user._id)
            setPartners(checkIfUserIdExistInPartnersArray);

          })
          .catch(e => console.log("failed to fetch the rooms", e));
      };

      fetchRooms();
    }
  }, [user, storedToken]);

  if (!user) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="rooms-page">
      <div className="myhome-page-nav">
        <div id="myhome-page-nav-a">
          <Link to="/myhome">Room</Link>
          <Link to="/living-room">Living Room</Link>
        </div>
      </div>

      <div className="rooms-card">
        {filterRoom.map((element) => {
          const isOwnedRoom = roomOwnerId.includes(element._id);
          const isPartnerRoom =
            partners &&
            element.partners.some((partner) => partner.partner === user._id);

          if (isOwnedRoom || isPartnerRoom) {
            return (
              <div key={element._id}>
                <RoomsGroupCard {...element} />
              </div>
            );
          }
          return <div key={`message-${element._id}`}>
          <h3>You haven't join the room</h3>
          </div>;
        })}
      </div>
    </div>
  );
}

export default MyLivingRoom;
