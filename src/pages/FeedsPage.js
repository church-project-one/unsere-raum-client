import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import AddFeedCard from "../components/AddFeedCard";
import FeedsCard from "../components/FeedsCard";

function FeedsPage() {
  const API_URL = "http://localhost:5005";
  const [feeds, setFeeds] = useState([]);
  const {user} = useContext(AuthContext);

  const fetchFeeds = () => {
    axios.get(`${API_URL}/api/feeds`)
      .then(response => {
        setFeeds(response.data)
      })
      .catch(e => console.log("failed to fetch the feeds from DB", e));
  };

  useEffect(() => {
    fetchFeeds();
  }, [])

  const toggleAddFeed = () => {
    var blurAllFeedsPage = document.getElementById("add-feed-container");
        blurAllFeedsPage.classList.toggle("active");
    var blurFeeds = document.getElementById("blur-all-feeds");
        blurFeeds.classList.toggle("active");    

    var popupAddFeedElement = document.getElementById("popup-add-feed");
        popupAddFeedElement.classList.toggle("active") 
  }

  if(feeds.length === undefined) {
    return <div className="loader"></div>
  } else {
    return(
      <div id="main-feeds-container">
        {!user ? <div className="feel-free">Feel free to sign-up</div> 
          : <div id="add-feed-container">
              <div id="add-feed">
                <img src={user.picture} alt="img" />
                <input placeholder="Tell us if you have a new product or request, please!"/>
              </div>
              <div id="publish-button-container">
                <button onClick={toggleAddFeed}>Publish</button>
              </div>
            </div>
        }
        <div id="popup-add-feed">
          <AddFeedCard />
          <button onClick={toggleAddFeed}>Close</button>
        </div>

        {feeds.map(feedElement => (
          <div key={feedElement._id}>
            <FeedsCard key={feedElement.ownerFeed._id} {...feedElement} responses={feedElement.ownerResponses}/>
          </div>
        ))}
      </div>
    )
  }
};

export default FeedsPage;