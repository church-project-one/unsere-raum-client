import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFeedCard() {
  const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  const [picture, setPicture] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productAddress, setProductAddress] = useState({
    street: "",
    number: "",
    postalcode: "",
    city: "",
    country: ""
  });
  const [availability, setAvailability] = useState("");

  const navigate = useNavigate();
  
  const uploadImage = (file) => {
   return axios.post(`${API_URL}/api/upload`, file)
      .then(response => response.data)
      .catch(e => console.log(e));
  };

  const handleImageUpload = (e) => {
    const uploadDataImage = new FormData();
    uploadDataImage.append("picture", e.target.files[0]);

    uploadImage(uploadDataImage)
      .then(response => setPicture(response.picture))
      .catch(e => console.log("error to add an image file", e));
  };

  const addNewFeed = (e) => {
    e.preventDefault();

    const newFeedBody = {
      picture,
      nameProduct,
      description,
      price,
      productAddress: {
        street: productAddress.street,
        number: productAddress.number,
        postalcode: productAddress.postalcode,
        city: productAddress.city,
        country: productAddress.country
      },
      availability
    }

    console.log(newFeedBody)

    axios.post(`${API_URL}/api/feeds`, newFeedBody, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        alert("success to add new feed");
        navigate("/feeds");
        window.location.reload();
      })
      .catch(e => console.log("failed to add new feed", e));
  };

  return(
    <div>
      <form onSubmit={addNewFeed} id="add-new-feed-form">
        <label>Tell us your new news</label>
        <input 
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <label>Picture</label>
        <input 
          type="file"
          name="picture"
          onChange={e => handleImageUpload(e)}
        />

        <label>Name of Product</label>
        <input 
          type="text"
          name="nameProduct"
          value={nameProduct}
          onChange={e => setNameProduct(e.target.value)}
        />

        <label>Price</label>
        <input 
          type="number"
          name="price"
          value={price}
          min={1}
          onChange={e => setPrice(e.target.value)}
        />

        <label>Address</label>
        <input 
          type="text"
          name="street"
          value={productAddress.street}
          onChange={e => setProductAddress({...productAddress, street: e.target.value})}
        />

        <input 
          type="number"
          name="number"
          value={productAddress.number}
          onChange={e => setProductAddress({...productAddress, number: e.target.value})}
        />

        <input 
          type="number"
          name="postalcode"
          value={productAddress.postalcode}
          onChange={e => setProductAddress({...productAddress, postalcode: e.target.value})}
        />

        <input 
          type="text"
          name="city"
          value={productAddress.city}
          onChange={e => setProductAddress({...productAddress, city: e.target.value})}
        />

        <input 
          type="text"
          name="country"
          value={productAddress.country}
          onChange={e => setProductAddress({...productAddress, country: e.target.value})}
        />

        <label>Availability</label>
        <input 
          type="text"
          name="availability"
          value={availability}
          onChange={e => setAvailability(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddFeedCard;