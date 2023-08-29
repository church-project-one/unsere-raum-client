import './App.css';
import {Routes, Route} from "react-router-dom";
import SignUp from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import AddRoomCard from './components/AddRoomCard';
import RoomPageDetails from './pages/RoomPageDetails';
import EditActivityCard from './components/EditActivityCard';
import MyHomePage from './pages/MyHomePage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import MyLivingRoom from './pages/MyLivingRoom';
import EditProfileCard from './components/EditProfileCard';
import AddPartnerCard from './components/AddPartnerCard';
import PartnerPageDetails from './pages/PartnerPageDetails';

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create-room" element={<AddRoomCard/>}/>
        <Route path="/rooms/:roomId" element={<RoomPageDetails />}/>
        <Route path="/activities/:activityId" element={<EditActivityCard />} />
        <Route path="/myhome" element={<MyHomePage/>}/>
        <Route path="/profile/:profileId" element={<ProfilePage/>}/>
        <Route path="/edit-profile/:profileId" element={<EditProfileCard/>} />
        <Route path="/living-room" element={<MyLivingRoom />} />
        <Route path="/add-partner/:roomId" element={<AddPartnerCard />} />
        <Route path="/partners/:partnerId" element={<PartnerPageDetails />} />
      </Routes>
      
    </div>
  );
}

export default App;
