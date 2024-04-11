import Header from "../../Components/Header";
import { Box } from "@mui/material";
import Calendar from "../../MainComponents/Calendar/Calendar";

const MainCalendar = () => {
  return (
    <Box m="1px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginLeft="20px"
      >
        <Header title="CALENDAR" subtitle="Welcome to your calendar"></Header>
      </Box>
      <Box>
        <Calendar></Calendar>
      </Box>
    </Box>
  );
};

export default MainCalendar;
