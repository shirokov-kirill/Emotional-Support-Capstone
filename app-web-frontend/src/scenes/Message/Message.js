import Header from "../../Components/Header";
import { Box } from "@mui/material";
const Message = () => {
  return (
    <Box m="1px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginLeft="20px"
      >
        <Header title="MESSAGE" subtitle="Welcome to your message"></Header>
      </Box>
    </Box>
  );
};

export default Message;
