import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/CircleNotifications";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LightModeIcon from "@mui/icons-material/NightlightTwoTone";
import { Link, useLocation } from 'react-router-dom';

const Topbar = (props) => {
  const location = useLocation();
  const isSelected = (path) => location.pathname === path;

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search Bar*/}
      <Box display="flex" backgroundColor="#e6e6e6" borderRadius="50px">
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search"></InputBase>
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      {/*Icons*/}
      <Box display="flex">
        <IconButton>
          <LightModeIcon />
        </IconButton>
        <Link to="/notifications" onClick={() => props.setSelected("/notifications")}>
          <IconButton color={isSelected("/notifications") ? "primary" : "default"}>
            <NotificationsIcon />
          </IconButton>
        </Link>
        <Link to="/setting" onClick={() => props.setSelected("/setting")}>
          <IconButton color={isSelected("/setting") ? "primary" : "default"}>
            <SettingsIcon />
          </IconButton>
        </Link>
        <Link to="/profile" onClick={() => props.setSelected("/profile")}>
          <IconButton color={isSelected("/profile") ? "primary" : "default"}>
            <PersonIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};
export default Topbar;
