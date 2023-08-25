import { Link } from "react-router-dom";
import AddActivityCard from "./AddActivityCard";
import { useEffect, useState } from "react";

function RoomsCard({ title, activities, _id }) {
  const [showAddActivityCard, setShowAddActivityCard] = useState("");
  const [completedFontWeight, setCompletedFontWeight] = useState(() => {
    return localStorage.getItem("completedFontWeight") || "normal"
  });

  const displayAddActivityCard = () => {
    setShowAddActivityCard(true);
  }

  const hiddenAddActivityCard = () => {
    setShowAddActivityCard(false);
  }

  useEffect(() => {
    localStorage.setItem("completedFontWeight", completedFontWeight);
  }, [completedFontWeight])

  const handleRemarkCompleted = () => {
    const newFontWeight = completedFontWeight === "normal" ? "bold" : "normal";
    setCompletedFontWeight(newFontWeight);
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
              <td onClick={handleRemarkCompleted} style={{fontWeight: completedFontWeight, cursor: "pointer"}} id="remark-completed">Completed</td>
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
      <Link to={`/rooms/${_id}`} className="details-font">Details</Link>
    </div>
  );
}

export default RoomsCard;
