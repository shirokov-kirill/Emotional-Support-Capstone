import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "../Topbar";
import ProSidebar from "../Sidebar";
import ChatAssistant from '../Assistant/ChatAssistant';

const wrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  padding: '0 16px',
  width: '100%'
}

export const Layout = ({ children }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <ProSidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
        <div style={wrapperStyles}>
            <Box flex={1} display={"flex"} flexDirection={"column"}>
                <Topbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet flex={1}/>
            </Box>
            <Box>
                {children}
            </Box>
        </div>
        <ChatAssistant/>
    </Box>
  );
};

export default Layout;
