import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const NewPatientApplications = ({ applications }) => {
    return (
        <Box
            width="300px"
            bgcolor="white"
            p="16px"
            borderRadius="8px"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            mr={2}
        >
            <Typography variant="h6" gutterBottom fontWeight="bold" color="textSecondary">
                New Patient Applications
            </Typography>
            <List>
                {applications.map((app, index) => (
                    <Box key={index} mb={1} p={2} bgcolor="#f0f0f0" borderRadius="8px">
                        <ListItem alignItems="flex-start" disableGutters>
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="body1" fontWeight="medium" color="textPrimary">
                                            {app.firstName} {app.lastName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Age: {app.age}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" mt={0.5}>
                                            Contact: {app.contact || "No contact info"}
                                        </Typography>
                                    </>
                                }
                                secondary={
                                    <Typography variant="body2" color="textSecondary">
                                        {app.reason || "No specific reason provided"}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default NewPatientApplications;