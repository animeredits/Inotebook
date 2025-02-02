import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/Notes/NotesState";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Footer from "./Components/Footer";
import { DashBoard } from "./Components/DashBoard";
// import ParticlesBackground from "./Components/ParticlesBackground";
import { Toaster } from "react-hot-toast";
import "./App.css";
function App() {
  const location = useLocation();
  return (
    <>
      {!(location.pathname === "/Login" || location.pathname === "/SignUp")}
      <NoteState>
        <Navbar />
        <Toaster
          position="top-right"
          background="#060417"
          reverseOrder={false}
        />
        <div className="container">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </NoteState>
    </>
  );
}

export default App;
