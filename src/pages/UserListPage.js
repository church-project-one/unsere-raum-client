import axios from "axios";
import { useEffect } from "react";

function UserListPage() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");

  const fetchUsers = () => {
    axios.get(`${API_URL}/api/users`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then()
      .catch(e => console.log("error to fetch the users"))
  };

  useEffect(() => {
    fetchUsers();
  }, [])

};

export default UserListPage;