import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/Menu";
import MainComponents from "../../MainComponents/MainComponents";
import "./Sidebar.css"; // Your custom styles

const ProSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [selected, setSelected] = useState("Dashboard");

  // Add a state for mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`custom-sidebar ${isSidebarOpen ? "collapsed" : ""} ${
        isMobile ? "mobile" : ""
      }`}
    >
      {/* Logo and Menu Icon */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {!isSidebarOpen && <h4>Harmony App</h4>}
        </div>
        <button
          className="menu-toggle-button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <MenuOutlinedIcon />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="sidebar-menu">
        {MainComponents.map(({ label, path, icon }) => (
          <div
            key={label}
            className={`menu-item ${selected === label ? "active" : ""}`}
            onClick={() => setSelected(label)}
          >
            <Link to={path} className="menu-link">
              <span className="menu-icon">{icon}</span>
              {!isSidebarOpen && <span className="menu-text">{label}</span>}
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default ProSidebar;
