import { useState } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Sidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import Item from "../../Components/Item";
import MenuOutlinedIcon from "@mui/icons-material/Menu";

import './Sidebar.css';
import MainComponents from "../../MainComponents/MainComponents";

const wrapperStyles = {
  display: 'flex',
  flexDirection: 'column'
}

const ProSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box>
      <Sidebar collapsed={isSidebarOpen}>
        <Menu iconShape="square">
          <div style={wrapperStyles}>
            {/* LOGO AND MENU ICON */}
            <MenuItem
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                icon={isSidebarOpen ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0", // Keep vertical margins, remove left/right
                  color: "grey",
                  paddingLeft: "2px" // Adjust left padding if necessary
              }}
            >
              {!isSidebarOpen && (
                  <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      ml="30px"
                  >
                    <Typography variant="h6" color="grey">
                      Harmony App
                    </Typography>
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
              )}
            </MenuItem>
            {/* USER*/}

            {/* MENU ITEMS */}
            { !isSidebarOpen && <Box
                paddingLeft={isSidebarOpen ? undefined : "2%"}
                paddingBottom="350px"
            > {
              MainComponents.map(({ element, label, path, icon }) => (
                  <Item
                      title={label}
                      to={path}
                      icon={icon}
                      selected={selected}
                      setSelected={setSelected}
                  />
              ))
            }
            </Box>}
          </div>

        </Menu>
      </Sidebar>
    </Box>
  );
};
export default ProSidebar;
