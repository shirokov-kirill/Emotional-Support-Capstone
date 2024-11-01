import { useState } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Sidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import Item from "../Components/Item";
import MenuOutlinedIcon from "@mui/icons-material/Menu";

import './Sidebar.css';
import { PatientMainComponents, HealthProviderMainComponents } from "../MainComponents/MainComponents";
import ComponentType from "../MainComponents/ComponentType";

const wrapperStyles = {
  display: 'flex',
  flexDirection: 'column'
}

export const PatientProSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
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
                style={{ margin: "10px 0 20px 0", color: "grey" }}
            >
              {!isSidebarOpen && (
                  <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      ml="15px"
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
                paddingLeft={isSidebarOpen ? undefined : "10%"}
                paddingBottom="350px"
            > {
              PatientMainComponents.map(({ element, label, path, icon }) => (
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


export const HealthProviderProSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
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
                  style={{ margin: "10px 0 20px 0", color: "grey" }}
              >
                {!isSidebarOpen && (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        ml="15px"
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
                  paddingLeft={isSidebarOpen ? undefined : "10%"}
                  paddingBottom="350px"
              > {
                HealthProviderMainComponents.map(({ element, label, path, icon }) => (
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
