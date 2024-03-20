import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/assessment">Assessment</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <h1>Emotional support</h1>
    </header>
  );
};

export default Header;