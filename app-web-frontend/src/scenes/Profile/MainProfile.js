import Header from "../../Components/Header";
import { Box } from "@mui/material";
import UserProfile from "../../Components/ProfileComponent/Profile";
const MainProfile = () => {
  return (
    <Box m="1px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginLeft="20px"
      >
        <Header title="PROFILE" subtitle="Welcome to your profile"></Header>
      </Box>
      <UserProfile></UserProfile>
    </Box>
  );
};

export default MainProfile;
