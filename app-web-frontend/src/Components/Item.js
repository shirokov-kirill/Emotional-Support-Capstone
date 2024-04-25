import { MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const isSelected = selected === title;
  const linkStyle = {
    textDecoration: "none",
    color: isSelected ? "#2D60FF" : "gray",
  };

  return (
    <MenuItem
      active={isSelected}
      style={{ color: isSelected ? "#2D60FF" : "gray" }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>
        <Link style={linkStyle} to={to}>
          {title}
        </Link>
      </Typography>
    </MenuItem>
  );
};
export default Item;