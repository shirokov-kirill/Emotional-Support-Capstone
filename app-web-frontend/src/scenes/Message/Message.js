import Header from "../../Components/Header";
import { Box } from "@mui/material";
import ChatApp from "../../Components/MessageComponent/RightPanel";
import StyledComponentExample from "../../Components/MessageComponent/MessageCard";

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
      <Box>
        <StyledComponentExample />
        <ChatApp />
      </Box>
    </Box>
  );
};

export default Message;
