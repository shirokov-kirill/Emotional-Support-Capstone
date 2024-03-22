import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Calendar from './Calendar/Calendar';
import EmotionAssessmentForm from './Emotion assessment/EmotionAssessmentForm'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/assessment" element={<EmotionAssessmentForm/>}/>
                <Route path="/calendar" element={<Calendar/>} />
            </Routes>
        </Router>
    )
}


export default App;