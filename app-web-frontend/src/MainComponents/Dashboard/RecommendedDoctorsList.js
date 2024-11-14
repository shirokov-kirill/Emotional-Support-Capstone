import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const RecommendedDoctorsList = ({ doctors }) => {
    return (
        <Box
            width="250px"
            bgcolor="white"
            p="16px"
            borderRadius="8px"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
        >
            <Typography variant="h6" gutterBottom fontWeight="bold" color="textSecondary">
                Recommended Doctors
            </Typography>
            <List>
                {doctors.map((doctor, index) => (
                    <Box
                        key={index}
                        mb={1}
                        p={2}
                        bgcolor="#f0f0f0"
                        borderRadius="8px"
                    >
                        <ListItem alignItems="flex-start" disableGutters>
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="body1" fontWeight="medium" color="textPrimary">
                                            {doctor.firstName}
                                        </Typography>
                                        <Typography variant="body1" fontWeight="medium" color="textPrimary">
                                            {doctor.lastName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {doctor.specialisation || "No specific specialisation"}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" mt={0.5}>
                                            {doctor.email || "No email provided"}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default RecommendedDoctorsList;
