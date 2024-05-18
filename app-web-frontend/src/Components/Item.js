import { MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <MenuItem
      active={selected === title}
      style={{ color: "green" }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>
        <Link style={linkStyle} to={to}>
          {title}
        </Link>
      </Typography>
      {/*<Link to={to}></Link> */}
    </MenuItem>
  );
};
export default Item;
