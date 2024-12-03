// import { Box, IconButton, useTheme } from "@mui/material";
// import { useContext } from "react";
// import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsIcon from "@mui/icons-material/CircleNotifications";
// import SettingsIcon from "@mui/icons-material/Settings";
// import PersonIcon from "@mui/icons-material/Person";
// import LightModeIcon from "@mui/icons-material/NightlightTwoTone";
// import MainComponents from "../MainComponents/MainComponents";
// import ComponentType from "../MainComponents/ComponentType";
// import { Link } from "react-router-dom";

// const Topbar = () => {
//   return (
//     <Box display="flex" justifyContent="space-between" p={2}>
//       {/* Search Bar*/}
//       <Box display="flex" backgroundColor="#e6e6e6" borderRadius="50px">
//         <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search"></InputBase>
//         <IconButton type="button" sx={{ p: 1 }}>
//           <SearchIcon />
//         </IconButton>
//       </Box>
//       {/*Icons*/}
//       <Box display="flex">
//         {MainComponents.map(({ label, path, icon, type }) => (
//           type === ComponentType.Topbar && (
//             <Link to={path}>
//               <IconButton
//                 key={label}
//                 onClick={() => {
//                   window.location.href = path; // Or use a router's navigate function if available
//                 }}
//                 title={label} // Adds tooltip text as the label
//               >
//                 {icon}
//               </IconButton>
//             </Link>
//           )
//         ))}
//         {/* <IconButton>
//           <LightModeIcon />
//         </IconButton>
//         <IconButton>
//           <NotificationsIcon />
//         </IconButton>
//         <IconButton>
//           <SettingsIcon />
//         </IconButton>
//         <IconButton>
//           <PersonIcon />
//         </IconButton> */}
//       </Box>
//     </Box>
//   );
// };
// export default Topbar;


import { Box, IconButton, useTheme, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { PatientMainComponents, HealthProviderMainComponents } from "../MainComponents/MainComponents";
import ComponentType from "../MainComponents/ComponentType";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const MainComponents = role === "patient" ? PatientMainComponents : role === "health_provider" ? HealthProviderMainComponents : [];

  console.log(role);
  const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        navigate('/');
    };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search Bar*/}
      <Box display="flex" backgroundColor="#e6e6e6" borderRadius="50px">
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons */}
        <Box display="flex">
            {MainComponents.map(({ label, path, icon, type }) => (
                type === ComponentType.Topbar && (
                    <Link key={label} to={path} style={{ textDecoration: 'none' }}>
                        <IconButton title={label}>
                            {icon}
                        </IconButton>
                    </Link>
                )
            ))}

            {/* Logout IconButton */}
            <IconButton title="Logout" onClick={handleLogout}>
                <FiLogOut size={24} />
            </IconButton>
        </Box>
    </Box>
  );
};

export default Topbar;
