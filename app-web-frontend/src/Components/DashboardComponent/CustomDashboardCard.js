import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import CardHeader from "@mui/material/CardHeader";

const CustomCard = ({ title, number, progress, imageSrc }) => {
  return (
    <Card
      style={{
        width: "300px",
        height: "200px",
        margin: "20px",
        padding: "1px",
      }}
    >
      <CardHeader title={title} />
      <CardContent>
        <CardContent style={{ display: "flex" }}>
          <Typography
            variant="h5"
            component="div"
            style={{ marginTop: "10px" }}
          >
            {number}
          </Typography>
          <img
            src={imageSrc}
            alt="Icon"
            style={{
              width: "50px",
              height: "50px",
              marginLeft: "140px",
            }}
          />
        </CardContent>
        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ height: "8px", borderRadius: "10px" }}
        />
      </CardContent>
    </Card>
  );
};

export default CustomCard;
