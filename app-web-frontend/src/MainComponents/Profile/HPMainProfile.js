import Header from "../../Components/Header";
import {Box} from "@mui/material";
import HealthProviderProfile from "../../Components/ProfileComponent/HealthProviderProfile";

const HPMainProfile = () => {
    return (
        <Box m="1px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginLeft="20px"
            >
                <Header title="PROFILE" subtitle="Welcome to your HP profile"></Header>
            </Box>
            <HealthProviderProfile></HealthProviderProfile>
        </Box>
    );
};

export default HPMainProfile;
