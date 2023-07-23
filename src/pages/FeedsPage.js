import axios from "axios";
import { useContext, useEffect, useState } from "react";
import comment from "../images/comment-icon.png";
import interested from "../images/interested-icon.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import AddFeedCard from "../components/AddFeedCard";

function FeedsPage() {
  const API_URL = "http://localhost:5005";
  const [feeds, setFeeds] = useState([]);
  const [responses, setResponses] = useState([]);
  const {user} = useContext(AuthContext);

  const fetchFeeds = () => {
    axios.get(`${API_URL}/api/feeds`)
      .then(response => {

        for(let i= 0; i < response.data.length ; i++) {
          const getResponses = response.data[i].ownerResponses
          const checkIfExist = getResponses.map(element => element)
          const fetchResponse = checkIfExist.map(element => element);
          setResponses(fetchResponse);
        }

        setFeeds(response.data)
      })
      .catch(e => console.log("failed to fetch the feeds from DB", e));
  };

  useEffect(() => {
    fetchFeeds();
  }, [])

  const toggleAddResponse = () => {
    var blurFeeds = document.getElementById("blur-all-feeds");
    blurFeeds.classList.toggle("active");
    
    var popupAddResponseElement = document.getElementById("popup-add-response");
        popupAddResponseElement.classList.toggle("active")
  }

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
        {!user ? <></> 
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
        <div id="popup-add-response">
          <p>An application programming interface (API) is a way for two or more computer programs to communicate with each other. 
          <br />It is a type of software interface, offering a service to other pieces of software.</p>
          <button onClick={toggleAddResponse}>Close</button>
        </div>
        <div id="blur-all-feeds">
          {feeds.map(feedsElement => (
            <div key={feedsElement._id} className="feeds-container">
              <div className="picture-and-name" key={feedsElement.ownerFeed._id}> 
                <img src={feedsElement.ownerFeed.picture} alt="profile-img" className="profile-img-in-feed"></img>
              </div>
              <div className="feeds-description-container" key={feedsElement.ownerFeed.name}>
                <p className="feed-name"><strong>{feedsElement.ownerFeed.name}</strong></p>
                <p className="feeds-description">{feedsElement.description}</p>
                <h3 style={{textAlign: "center"}}>{feedsElement.name}</h3>
                <Link to={`/feeds/${feedsElement._id}`}>
                  {feedsElement.picture && <img src={feedsElement.picture} alt="img" className="feed-picture"/>}
                </Link>
                {feedsElement.price && <p className="feed-price">Price: {feedsElement.price} €</p>}
                <div id="blur-container-in-feeds">
                  <img src={comment} alt="img" onClick={toggleAddResponse}/>
                  <img src={interested} alt="img" />
                </div>
                <div className="responses-inside-feed" id="responses-inside-feed" key={feedsElement.description}>
                  {responses.map(elementResponses => (
                    <div className="sub-responses-inside-feed" key={elementResponses._id}>
                      <div className="picture-and-name" key={elementResponses.ownerResponse._id}>
                        <img src={elementResponses.ownerResponse.picture} alt="img" className="profile-img-in-feed"/>
                      </div>
                      <div key={elementResponses.name} className="response-description-of-feed">
                        <p className="response-feed-name"><strong>{elementResponses.ownerResponse.name}</strong></p>
                        <p className="response-description-in-feed">{elementResponses.response}</p>
                        {elementResponses.picture 
                          && <img src={elementResponses.picture} alt="img" className="feed-picture"/>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
};

export default FeedsPage;