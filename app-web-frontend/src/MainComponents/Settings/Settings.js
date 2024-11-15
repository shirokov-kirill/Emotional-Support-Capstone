import Header from "../../Components/Header";
import { Box } from "@mui/material";

const Settings = () => {
  return (
    <Box m="1px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginLeft="20px"
      >
        <Header title="Settings" subtitle="Welcome to your profile"></Header>
      </Box>
    </Box>
  );
};

export default Settings;
