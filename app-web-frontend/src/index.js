/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Login/Login';
import HeaderLayout from './header/Header';
import MainComponents from './MainComponents/MainComponents.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <HeaderLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          {MainComponents.map((component, index) => (
            <Route key={index + 1} path={component.path} element={<component.element />} />
          ))}
        </Routes>
      </HeaderLayout>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/
