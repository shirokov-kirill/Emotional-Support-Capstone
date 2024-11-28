import { Box } from "@mui/material";
import CustomCard from "../../../Components/DashboardComponent/CustomDashboardCard";
import Header from "../../../Components/Header";
import cardImage from "./Images/Pie_chart.png";
import CustomDashboardCardDoctor from "../../../Components/DashboardComponent/CustomDashboardCardDoctor";
import {useEffect, useState} from "react";
import {SERVER_ADDRESS} from "../../../setupInfo";
import RecommendedDoctorsList from "./RecommendedDoctorsList";
import {getUserAuthToken} from "../../../reusables/utils/AuthToken";

const Dashboard = () => {

    const [recommendedDoctors, setRecommendedDoctors] = useState([]);

    useEffect(() => {
        fetchRecommendedDoctors();
    }, []);

    const fetchRecommendedDoctors = async () => {
        try {
            const authToken = getUserAuthToken()
            const url = SERVER_ADDRESS + '/getRecommendedDoctorsByMoods'
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                mode: 'no-cors'
            });

            if (response.status !== 200) {
                throw new Error('Failed to fetch patient data');
            }

            setRecommendedDoctors(response.data);

        } catch (error) {
            console.error('Error fetching relevant doctors', error);
            // Test doctors
            setRecommendedDoctors([
                { firstName: "Gregory", lastName: "House", specialisation: "Depressive Disorders", email: "doctor.house@gmail.com" },
                { firstName: "John", lastName: "Watson", specialisation: "PTSD", email: "sherlock.holms@gmail.com" },
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
