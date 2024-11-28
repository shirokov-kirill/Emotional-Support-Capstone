import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const EmergentChangesList = ({ updates }) => {
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
        >
            <Typography variant="h6" gutterBottom fontWeight="bold" color="textSecondary">
                Emergent changes in patients' moods
            </Typography>
            <List>
                {updates.map((update, index) => (
                    <Box key={index} mb={1} p={2} bgcolor="#ffe0e0" borderRadius="8px">
                        <ListItem alignItems="flex-start" disableGutters>
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="body1" fontWeight="medium" color="textPrimary">
                                            {update.patientName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Issue: {update.issue || "No issue specified"}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" mt={0.5}>
                                            Status: {update.status || "Status not available"}
                                        </Typography>
                                    </>
                                }
                                secondary={
                                    <Typography variant="body2" color="textSecondary">
                                        Last Updated: {update.lastUpdated || "Unknown"}
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

export default EmergentChangesList;