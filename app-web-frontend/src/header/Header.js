import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { isLoggedIn } from "../Login/Login";
import { PatientMainComponents, HealthProviderMainComponents } from '../MainComponents/MainComponents.js';


const Header = () => {
  const role = localStorage.getItem("role");

  const MainComponents = role === "patient" ? PatientMainComponents : role === "health_provider" ? HealthProviderMainComponents : [];
  
  return (
    <header>
      <nav>
        <ul>
          {MainComponents.map((component, index) => (
            <li key={index}><Link to={component.path}>{component.label}</Link></li>
          ))}
        </ul>
      </nav>
      <h1>Emotional support</h1>
    </header>
  );
};


const HeaderLayout = ({ children }) => {
  return (
    <div>
      <div className="header">{isLoggedIn() && <Header />}</div>
      <div>{children}</div>
    </div>
  );
};


export default HeaderLayout;