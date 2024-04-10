import Header from "../../Components/Header";
import { Box } from "@mui/material";
const Feedback = () => {
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
    </Box>
  );
};

export default Feedback;
