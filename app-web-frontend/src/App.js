
/*import "./index.css";
import Topbar from "./scenes/global/Topbar";
import { Routes, Route } from "react-router-dom";
import ProSidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/Dashboard";
import MainCalendar from "./scenes/Calendar/MainCalendar";
import Appointment from "./scenes/Appointment/Appointment";
import Message from "./scenes/Message/Message";
import Feedback from "./scenes/Feedback/Feedback";
import Profile from "./scenes/Profile/Profile";

function App() {
  return (
    <>
      <div className="App">
        <ProSidebar />
        <main className="content">
          <Topbar></Topbar>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<MainCalendar />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/message" element={<Message />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;





import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Login/Login';
import Home from './Home/Home';
import Calendar from './Calendar/Calendar';
import EmotionAssessmentForm from './Emotion assessment/EmotionAssessmentForm'
import LoginChoice from "./Login/LoginChoice";
import HealthProviderLogin from "./Login/HealthProviderLogin";
import HealthProviderHome from "./Home/HealthProviderHome";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginChoice/>} />
                <Route path="/user" element={<Login/>} />
                <Route path="/hprovider" element={<HealthProviderLogin/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/assessment" element={<EmotionAssessmentForm/>}/>
                <Route path="/home/hprovider" element={<HealthProviderHome/>} />
                <Route path="/calendar" element={<Calendar/>} />
            </Routes>
        </Router>
    )
}


export default App;*/
