import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Login/Login';
import Home from './MainComponents/Home/Home';
import Calendar from './MainComponents/Calendar/Calendar';
import EmotionAssessmentForm from './MainComponents/Emotion assessment/EmotionAssessmentForm'
import LoginChoice from "./Login/LoginChoice";
import HealthProviderLogin from "./Login/HealthProviderLogin";
import HealthProviderHome from "./Home/HealthProviderHome";
import ChatsPage from "./MainComponents/Chats/ChatsPage";
import Feedback from './MainComponents/Feedback/Feedback';

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
                <Route path="/chats" element={<ChatsPage/>} />
                <Route path="/feedback" element={<Feedback/>} />
            </Routes>
        </Router>
    )
}


export default App;