import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditFeedCard({feedId}) {
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
  const navigate = useNavigate()

 
  const fetchFeed = () => {
    axios.get(`${API_URL}/api/feeds/${feedId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        setPicture(response.data.picture);
        setNameProduct(response.data.name);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setProductAddress({
          street: response.data.productAddress.street,
          number: response.data.productAddress.number,
          postalcode: response.data.productAddress.postalcode,
          city: response.data.productAddress.city,
          country: response.data.productAddress.country
        });
        setAvailability(response.data.availability);
      });
  };

  useEffect(() => {
    fetchFeed()
  }, []);

  const updateFeedHandle = (e) => {
    e.preventDefault();

    const updateFeedBody = {
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
    };

    axios.put(`${API_URL}/api/feeds/${feedId}`, updateFeedBody, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        navigate("/feeds");
      })
      .catch(e => console.log("failed to update", e));
  };

  return(
    <div>
      <form onSubmit={updateFeedHandle} id="update-feed-form">
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
          onChange={e => setPicture(e.target.value)}
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

export default EditFeedCard;