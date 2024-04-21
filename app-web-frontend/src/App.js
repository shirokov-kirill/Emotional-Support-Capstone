import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Login/Login";
import Home from "./Home/Home";
import Calendar from "./Calendar/Calendar";
import EmotionAssessmentForm from "./Emotion assessment/EmotionAssessmentForm";
import LoginChoice from "./Login/LoginChoice";
import HealthProviderLogin from "./Login/HealthProviderLogin";
import HealthProviderHome from "./Home/HealthProviderHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginChoice />} />
        <Route path="/user" element={<Login />} />
        <Route path="/hprovider" element={<HealthProviderLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/assessment" element={<EmotionAssessmentForm />} />
        <Route path="/home/hprovider" element={<HealthProviderHome />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
