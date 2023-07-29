import comment from "../images/comment-icon.png";
import interested from "../images/interested-icon.png";
import { Link } from "react-router-dom";
import AddResponseCard from "./AddResponseCard";
import EditResponsePage from "../pages/EditResponsePage";

function FeedsCard({_id, picture, ownerFeed, description, name, price, responses}) {

  return(
    <div>
        <div id="blur-all-feeds">
            <div className="feeds-container">
              <div className="picture-and-name"> 
                <img src={ownerFeed.picture} alt="profile-img" className="profile-img-in-feed"></img>
                <p className="feed-name"><strong>{ownerFeed.name}</strong></p>
              </div>
              <div className="feeds-description-container">
                <p className="feeds-description">{description}</p>
                <h3 style={{textAlign: "center"}}>{name}</h3>
                <Link to={`/feeds/${_id}`}>
                  {picture && <img src={picture} alt="img" className="feed-picture"/>}
                </Link>
                {price && <p className="feed-price">Price: {price} €</p>}
                <div id="comment-interested">
                  <img src={comment} alt="img"/>
                  <img src={interested} alt="img" />
                </div>
                <div className="add-response-card-in-feed">
                  <AddResponseCard feedId={_id}/>
                </div>
                <div className="responses-inside-feed" id="responses-inside-feed">
                      {responses.map(elementResponses => (
                        <div className="sub-responses-inside-feed" key={elementResponses._id}>
                          <div className="picture-and-name">
                            <img src={elementResponses.ownerResponse.picture} alt="img" className="profile-img-in-feed"/>
                          </div>
                          <div key={elementResponses.name} className="response-description-of-feed">
                            <p className="response-feed-name"><strong>{elementResponses.ownerResponse.name}</strong></p>
                            <p>{elementResponses.rating}</p>
                            <p className="response-description-in-feed">{elementResponses.response}</p>
                            {elementResponses.picture 
                              && <img src={elementResponses.picture} alt="img" className="feed-picture"/>}
                          </div>
                          <Link to={`/response/${elementResponses._id}`}>Edit</Link>
                        </div>
                      ))}
                </div>
              </div>
            </div>

        </div>
    </div>
  );
};

export default FeedsCard;