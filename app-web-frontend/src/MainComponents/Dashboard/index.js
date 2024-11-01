import { Box } from "@mui/material";
import CustomCard from "../../Components/DashboardComponent/CustomDashboardCard";
import Header from "../../Components/Header";
import cardImage from "./Images/Pie_chart.png";
import CustomDashboardCardDoctor from "../../Components/DashboardComponent/CustomDashboardCardDoctor";
import {useEffect, useState} from "react";
import {SERVER_ADDRESS} from "../../setupInfo";
import axios from "axios";
import RecommendedDoctorsList from "./RecommendedDoctorsList";

const Dashboard = () => {

    const [recommendedDoctors, setRecommendedDoctors] = useState([]);

    useEffect(() => {
        fetchRecommendedDoctors();
    }, []);

    const fetchRecommendedDoctors = async () => {
        try {
            const response = await axios.get(SERVER_ADDRESS + '/getRecommendedDoctors');

            if (response.status !== 200) {
                throw new Error('Failed to fetch patient data');
            }

            setRecommendedDoctors(response.data);

        } catch (error) {
            console.error('Error fetching relevant doctors', error);
            // Test doctors
            setRecommendedDoctors([
                { name: "Doctor A", specializations: ["Depressive Disorders", "Anxiety Disorders"], email: "doctor.a@gmail.com" },
                { name: "Doctor B", specializations: ["PTSD"], email: "doctor.b@gmail.com"  }
            ]);
        }
    };


    return (
        <Box display="flex" m="10px">
            <Box flex="1" mr="20px">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginLeft="20px"
                >
                    <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
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

            <RecommendedDoctorsList doctors={recommendedDoctors} />
        </Box>
  );
};

export default Dashboard;
