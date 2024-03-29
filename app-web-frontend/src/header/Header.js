import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { isLoggedIn } from "../Login/Login";
import MainComponents from '../MainComponents/MainComponents.js';


const Header = () => {
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
