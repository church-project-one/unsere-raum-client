import './App.css';
import {Routes, Route} from "react-router-dom";
import RoomsPage from './pages/RoomsPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route to="/rooms" element={<RoomsPage />} />
      </Routes>
    </div>
  );
}

export default App;
