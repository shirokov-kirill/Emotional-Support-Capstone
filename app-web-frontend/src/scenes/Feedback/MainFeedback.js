import Header from "../../Components/Header";
import { Box } from "@mui/material";
import Feedback from "../../Components/FeedbackComponent/Feedback";
const MainFeedback = () => {
  return (
    <Box m="1px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginLeft="20px"
      >
        <Header title="FEEDBACK" subtitle="Welcome to your feedback"></Header>
      </Box>
      <Feedback></Feedback>
    </Box>
  );
};

export default MainFeedback;
