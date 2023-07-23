import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditFeedCard from "../components/EditFeedCard";

function FeedDetailsPage() {
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  const {feedId} = useParams();
  const [feedDetails, setFeedDetails] = useState("");

  const navigate = useNavigate();

  const fetchFeedDetails = () => {
    axios.get(`${API_URL}/api/feeds/${feedId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        setFeedDetails(response.data)
      })
      .catch(e => console.log("failed to fetch the details feed", e));
  };

  const deleteFeed = () => {
    axios.delete(`${API_URL}/api/feeds/${feedId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => navigate(-1))
      .catch(e => console.log("failed to delete the feed", e));
  };

  useEffect(() => {
    fetchFeedDetails();
  }, [])

  console.log(feedDetails)

  if (!feedDetails) {
    return <div className="loader"></div>;
  }

  return(
    <div id="feed-details-page">
      <div>
        <img src={feedDetails.picture} alt="img"/>
      </div>
      <div id="feed-details-description">
        <h2>{feedDetails.name}</h2>
        <p>€ {feedDetails.price}</p>
        <p>Owner: {feedDetails.ownerFeed.name}</p>
        <p>Address: {feedDetails.productAddress.street} {feedDetails.productAddress.number}, 
          {feedDetails.productAddress.postalcode}, {feedDetails.productAddress.city} {feedDetails.productAddress.country}
        </p>
        <p>{new Date(feedDetails.createdAt).toDateString("en", {day: "2-digit", month: "long", year: "numeric  "})}</p>
        <h2>Description of this item</h2>
        <ul>
          <li></li>
        </ul>
      <button onClick={deleteFeed}>Delete</button>
      <EditFeedCard feedId={feedDetails._id}/>
      </div>
    </div>
  );
};

export default FeedDetailsPage;