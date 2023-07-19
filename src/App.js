import './App.css';
import {Routes, Route} from "react-router-dom";
import RoomsPage from './pages/RoomsPage';
import SignUp from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import AddRoomCard from './components/AddRoomCard';
import RoomPageDetails from './pages/RoomPageDetails';


function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/rooms" element={<RoomsPage/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create-room" element={<AddRoomCard/>}/>
        <Route path="/rooms/:roomId" element={<RoomPageDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
