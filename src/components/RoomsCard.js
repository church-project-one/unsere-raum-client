import { Link } from "react-router-dom";
import AddActivityCard from "./AddActivityCard";
import { useState } from "react";
import EditActivityCard from "./EditActivityCard";

function RoomsCard({ title, activities, _id }) {
  
  const [showAddActivityCard, setShowAddActivityCard] = useState("");

  const displayAddActivityCard = () => {
    setShowAddActivityCard(true);
  }

  const hiddenAddActivityCard = () => {
    setShowAddActivityCard(false);
  }

  return (
    <div className="sub-rooms-card">
      <h1>{title}</h1>
      <div className="add-new-activity-div">
        <span style={{cursor: "pointer"}} onClick={displayAddActivityCard} className="add-new-activity-sign">+</span>
        <span className="add-new-activity-text">Add new activity</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Activity</th>
            <th>Leader</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((element, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{new Date(element.date).toLocaleDateString("en", {day: "2-digit", month: "long", year: "numeric"})}</td>
              <td>{element.hour}</td>
              <td>{element.activity}</td>
              <td>{element.leader}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddActivityCard 
        ? <div>
            <AddActivityCard roomId={_id}/>
            <button onClick={hiddenAddActivityCard} className="cancel-add-activity-button">Cancel</button>
          </div> 
        : <></>
      }
      <Link to={`/rooms/${_id}`}>Details</Link>
    </div>
  );
}

export default RoomsCard;
