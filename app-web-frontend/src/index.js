import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Login/Login';
import { PatientMainComponents, HealthProviderMainComponents } from './MainComponents/MainComponents.js';
import LoginChoice from "./Login/LoginChoice";
import HealthProviderLogin from "./Login/HealthProviderLogin";
import HealthProviderHome from "./Home/HealthProviderHome";
import { PatientLayout, HealthProviderLayout } from "./global/Layout";
import ResetPassword from "./Login/ResetPassword";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <HealthProviderLayout>
        <Routes>
            <Route path="/" element={<LoginChoice/>}/>
            <Route path="/user" element={<Login/>}/>
            <Route path="/hprovider" element={<HealthProviderLogin/>}/>
            <Route path="/password_reset" element={<ResetPassword/>}/>
            <Route path="/home/hprovider" element={<HealthProviderHome/>}/>
          {HealthProviderMainComponents.map((component, index) => (
            <Route key={index + 1} path={component.path} element={<component.element />} />
          ))}
        </Routes>
      </HealthProviderLayout>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
