import { Box } from "@mui/material";
import CustomCard from "../../Components/DashboardComponent/CustomDashboardCard";
import Header from "../../Components/Header";
import cardImage from "./Images/Pie_chart.png";
import CustomDashboardCardDoctor from "../../Components/DashboardComponent/CustomDashboardCardDoctor";
const Dashboard = () => {
  return (
    <Box m="10px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginLeft="20px"
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"></Header>
      </Box>
      <Box margin="30px">
        <CustomCard
          title="New Patient"
          number={49}
          progress={66}
          imageSrc={cardImage}
        />
        <CustomDashboardCardDoctor
          bloodSugarLevel={80}
          title="Blood Sugar"
          statusLabel="Normal"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
