import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Login/Login';
import { PatientMainComponents, HealthProviderMainComponents } from './MainComponents/MainComponents.js';
import LoginChoice from "./Login/LoginChoice";
import HealthProviderLogin from "./Login/HealthProviderLogin";
import HealthProviderHome from "./Home/HealthProviderHome";
import Layout from "./global/Layout";
import ResetPassword from "./Login/ResetPassword";
import ForgotPassword from './Login/ForgotPassword';
import ForgotPasswordConfirmation from './Login/ForgotPasswordConfirmation';

const App = () => {
  const role = localStorage.getItem("role");
  const isAuthenticated = Boolean(role);

  const roleBasedComponents = role === "patient" ? PatientMainComponents : role === "health_provider" ? HealthProviderMainComponents : [];

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginChoice/>}/>
                <Route path="/user" element={<Login/>}/>
                <Route path="/hprovider" element={<HealthProviderLogin/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/forgot-password-confirmation" element={<ForgotPasswordConfirmation/>}/>
                <Route path="/reset-password/:token" element={<ResetPassword/>}/>

        {isAuthenticated ? (
          <Route element={<Layout />}>
            {role === "health_provider" && (
              <Route path="/home/hprovider" element={<HealthProviderHome />} />
            )}
            {roleBasedComponents.map((component, index) => (
              <Route key={index} path={component.path} element={<component.element />} />
            ))}
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  );
};

localStorage.clear();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();