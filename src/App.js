import './App.css';
import {Routes, Route} from "react-router-dom";
import RoomsPage from './pages/RoomsPage';
import SignUp from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import AddRoomCard from './components/AddRoomCard';
import RoomPageDetails from './pages/RoomPageDetails';
import EditActivityCard from './components/EditActivityCard';
import FeedsPage from './pages/FeedsPage';
import MyHomePage from './pages/MyHomePage';
import ProfilePage from './pages/ProfilePage';
import FeedDetailsPage from './pages/FeedDetailsPage';
import EditResponsePage from './pages/EditResponsePage';

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/rooms" element={<RoomsPage/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create-room" element={<AddRoomCard/>}/>
        <Route path="/rooms/:roomId" element={<RoomPageDetails />}/>
        <Route path="/activities/:activityId" element={<EditActivityCard />} />
        <Route path="/feeds" element={<FeedsPage/>}/>
        <Route path="/myhome" element={<MyHomePage/>}/>
        <Route path="/profile/:profileId" element={<ProfilePage/>}/>
        <Route path="/feeds/:feedId" element={<FeedDetailsPage/>}/>
        <Route path="response/:responseId" element={<EditResponsePage />}/>
      </Routes>
      
    </div>
  );
}

export default App;
