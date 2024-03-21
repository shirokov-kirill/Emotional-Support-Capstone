import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './Calendar/Calendar';
import Header from './header/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/calendar" element={<Calendar/>} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);

function Home() {
  return <h2>Home</h2>;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
