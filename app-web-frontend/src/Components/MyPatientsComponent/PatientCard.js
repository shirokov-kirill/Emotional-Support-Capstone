import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const PatientCard = ({
  profile,
  name,
  weight,
  bloodPressure,
  bloodGlucose,
}) => {
  return (
    <Card
      style={{
        width: "250px",
        height: "270px",
        margin: "20px",
        padding: "10px",
        borderRadius: "10px",
        borderColor: "#d9d9f2",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <CardHeader
        style={{ display: "block" }}
        avatar={<Avatar alt={name} src={profile} />}
        title=<span
          style={{
            fontFamily: "initial",
            fontSize: "22px",
          }}
        >
          {name}
        </span>
        subheader="Patient Details"
      />
      <CardContent>
        <Typography variant="body2" spacing={9} color="text.secondary">
          Weight :
          <span
            style={{
              fontSize: "15px",
              color: "#333399",
              fontFamily: "inherit",
              marginLeft: "125px",
            }}
          >
            {weight}
          </span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Blood Pressure:{" "}
          <span
            style={{
              fontSize: "15px",
              color: "#333399",
              fontFamily: "inherit",
              marginLeft: "10px",
            }}
          >
            {bloodPressure}
          </span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Blood Glucose:{" "}
          <span
            style={{
              fontSize: "15px",
              color: "#333399",
              fontFamily: "inherit",
              marginLeft: "35px",
            }}
          >
            {bloodGlucose}
          </span>
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: "20px" }}
      >
        View detail patient
      </Button>
    </Card>
  );
};

export default PatientCard;
