import { Typography, Box, useTheme } from "@mui/material";
const Header = ({ title, subtitle }) => {
  return (
    <Box mb="10px">
      <Typography
        variant="h5"
        color="#001a00"
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="subtitle2" color="#001a00">
        {subtitle}
      </Typography>
    </Box>
  );
};
export default Header;
