import { Box, Button } from "@mui/material";
import CustomCard from "../../../Components/DashboardComponent/CustomDashboardCard";
import Header from "../../../Components/Header";
import cardImage from "./Images/Pie_chart.png";
import CustomDashboardCardDoctor from "../../../Components/DashboardComponent/CustomDashboardCardDoctor";
import {useEffect, useState} from "react";
import {SERVER_ADDRESS} from "../../../setupInfo";
import RecommendedDoctorsList from "./RecommendedDoctorsList";
import NewPatientsList from "./NewPatientsList";
import EmergentChangesList from "./EmergentChangesList";
import {getUserAuthToken} from "../../../reusables/utils/AuthToken";
import { useNavigate } from "react-router-dom";

const HProviderDashboard = () => {

    const [recommendedDoctors, setRecommendedDoctors] = useState([]);
    const [newPatients, setNewPatients] = useState([]);
    const [emergentChanges, setEmergentChanges] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchRecommendedDoctors();
        fetchNewPatients();
        fetchEmergentChanges();
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

    const fetchNewPatients = async () => {
        try {
            const authToken = getUserAuthToken();
            const url = SERVER_ADDRESS + '/getNewPatientApplications';
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                mode: 'no-cors'
            });

            if (response.status !== 200) {
                throw new Error('Failed to fetch new patient data');
            }

            setNewPatients(response.data || []);
        } catch (error) {
            console.error('Error fetching new patient applications', error);
            setNewPatients([
                { firstName: "John", lastName: "Doe", age: 45, contact: "john.doe@example.com", reason: "Initial Consultation" },
                { firstName: "Jane", lastName: "Smith", age: 34, contact: "jane.smith@example.com", reason: "Routine Checkup" },
            ]);
        }
    };

    const fetchEmergentChanges = async () => {
        try {
            const authToken = getUserAuthToken();
            const url = SERVER_ADDRESS + '/getEmergentChanges';
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                mode: 'no-cors'
            });

            if (response.status !== 200) {
                throw new Error('Failed to fetch emergent changes data');
            }

            setEmergentChanges(response.data || []);
        } catch (error) {
            console.error('Error fetching emergent patient changes', error);
            setEmergentChanges([
                { patientName: "Alice Johnson", issue: "High Fever", status: "Critical", lastUpdated: "2 hours ago" },
                { patientName: "Robert Brown", issue: "Chest Pain", status: "Stable", lastUpdated: "30 minutes ago" },
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
                {/* <Box margin="30px">
                    <CustomCard
                        title="New Doctor"
                        number={49}
                        progress={66}
                        imageSrc={cardImage}
                    />
                </Box> */}
                <Box ml="20px" mt="10px">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/profile")}
                    >
                        Update Profile
                    </Button>
                </Box>
            </Box>

            <Box display="flex" flexDirection="row" width="auto" ml="auto" gap="16px">
                <NewPatientsList applications={newPatients} />
                <EmergentChangesList updates={emergentChanges} />
            </Box>
        </Box>
    );
};

export default HProviderDashboard;
