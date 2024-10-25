import { Box } from "@mui/material";

import Header from "../../Components/Header";
import cardImage from "./Images/Pie_chart.png";

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
    </Box>
  );
};

export default Dashboard;
