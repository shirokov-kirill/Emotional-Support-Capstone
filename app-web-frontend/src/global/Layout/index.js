import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "../Topbar";
import ProSidebar from "../Sidebar";

const wrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  padding: '0 16px',
  width: '100%'
}

const Layout = ({ children }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle function to maintain previous state
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <ProSidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen} // Still passing this if needed
      />
      <div style={wrapperStyles}>
        <Box>
          <Topbar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar} // Pass toggle function
          />
          <Outlet />
        </Box>
        <Box>
          {children}
        </Box>
      </div>
    </Box>
  );
};

export default Layout;
