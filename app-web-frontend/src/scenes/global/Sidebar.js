import { useState } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Sidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Cottage";
import PatientIcon from "@mui/icons-material/Groups2";
import SmsIcon from "@mui/icons-material/Sms";
import ProfileIcon from "@mui/icons-material/Person2";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import Item from "../../Components/Item";
import MenuOutlinedIcon from "@mui/icons-material/Menu";
import AppointmentIcon from "@mui/icons-material/Schedule";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AssessmentIcon from "@mui/icons-material/Assessment";

const ProSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box>
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: "grey" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h6" color="grey">
                  Harmony App
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* USER*/}

          {/* MENU ITEMS */}
          <Box
            paddingLeft={isCollapsed ? undefined : "10%"}
            paddingBottom="350px"
          >
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Assessment"
              to="/assessment"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Appointments"
              to="/appointment"
              icon={<AppointmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Message"
              to="/message"
              icon={<SmsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Feedback"
              to="/feedback"
              icon={<FeedbackIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Profile"
              to="/profile"
              icon={<ProfileIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};
export default ProSidebar;
