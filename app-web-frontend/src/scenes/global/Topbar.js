import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/CircleNotifications";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LightModeIcon from "@mui/icons-material/NightlightTwoTone";
import { Link, useLocation } from 'react-router-dom';

const Topbar = ({ selected, setSelected }) => {
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
        <IconButton onClick={() => setSelected("/notifications")} component={Link} to="/notifications" color={isSelected("/notifications") ? "primary" : "default"}>
          <NotificationsIcon />
        </IconButton>
        <IconButton onClick={() => setSelected("/setting")} component={Link} to="/setting" color={isSelected("/setting") ? "primary" : "default"}>
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={() => setSelected("/profile")} component={Link} to="/profile" color={isSelected("/profile") ? "primary" : "default"}>
          <PersonIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Topbar;