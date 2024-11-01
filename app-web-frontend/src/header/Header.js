import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { isLoggedIn } from "../Login/Login";
import { PatientMainComponents, HealthProviderMainComponents } from '../MainComponents/MainComponents.js';


const PatientHeader = () => {
  return (
    <header>
      <nav>
        <ul>
          {PatientMainComponents.map((component, index) => (
            <li key={index}><Link to={component.path}>{component.label}</Link></li>
          ))}
        </ul>
      </nav>
      <h1>Emotional support</h1>
    </header>
  );
};


export const PatientHeaderLayout = ({ children }) => {
  return (
    <div>
      <div className="header">{isLoggedIn() && <PatientHeader />}</div>
      <div>{children}</div>
    </div>
  );
};


const HealthProviderHeader = () => {
  return (
    <header>
      <nav>
        <ul>
          {HealthProviderMainComponents.map((component, index) => (
            <li key={index}><Link to={component.path}>{component.label}</Link></li>
          ))}
        </ul>
      </nav>
      <h1>Emotional support</h1>
    </header>
  );
};


export const HealthProviderHeaderLayout = ({ children }) => {
  return (
    <div>
      <div className="header">{isLoggedIn() && <HealthProviderHeader />}</div>
      <div>{children}</div>
    </div>
  );
};