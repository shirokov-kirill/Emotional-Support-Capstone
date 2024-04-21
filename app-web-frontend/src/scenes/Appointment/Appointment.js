import Header from "../../Components/Header";
import AppointmentCard from "../../Components/AppointmentsComponent/AppointmentsCard";
import { Box } from "@mui/material";
const Appointment = () => {
  return (
    <Box m="1px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginLeft="20px"
      >
        <Header
          title="APPOINTMENT"
          subtitle="Welcome to your appointment"
        ></Header>
      </Box>
      <Box>
        <AppointmentCard />
      </Box>
    </Box>
  );
};

export default Appointment;
