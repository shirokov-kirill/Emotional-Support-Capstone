import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/CircleNotifications";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LightModeIcon from "@mui/icons-material/NightlightTwoTone";
const Topbar = () => {
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
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <PersonIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Topbar;
