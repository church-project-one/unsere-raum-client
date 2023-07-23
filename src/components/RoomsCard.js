import { Link } from "react-router-dom";
import AddActivityCard from "./AddActivityCard";
import { useState } from "react";

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
        <span className="add-new-activity-text">Add to do list</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>To do list</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((element, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{element.activity}</td>
              <td>Complete</td>
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
