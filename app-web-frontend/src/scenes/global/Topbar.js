import React from "react";
import "./Topbar.css"; // Make sure you import the CSS file

const Topbar = () => {
  return (
    <div className="topbar">
      <ul className="topbar-list">
        <li className="topbar-item">
          <a href="/contact" className="topbar-link">
            Contacts
          </a>
        </li>

        <li className="topbar-item">
          <a href="/setting" className="topbar-link">
            Settings
          </a>
        </li>
        <li className="topbar-item">
          <a href="/profile" className="topbar-link">
            Profile
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Topbar;
