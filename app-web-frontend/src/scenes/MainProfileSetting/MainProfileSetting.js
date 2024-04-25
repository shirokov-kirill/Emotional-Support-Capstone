import Header from "../../Components/Header";
import { Box } from "@mui/material";
import AccountSettings from "../../Components/ProfileSetting/Setting";
const MainProfileSetting = () => {
  return (
    <Box m="1px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginLeft="20px"
      >
        <Header
          title="Setting"
          subtitle="Welcome to your Account Setting"
        ></Header>
      </Box>
      <AccountSettings></AccountSettings>
    </Box>
  );
};

export default MainProfileSetting;
