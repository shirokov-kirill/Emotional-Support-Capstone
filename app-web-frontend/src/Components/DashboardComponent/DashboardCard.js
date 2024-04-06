import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 400px;
  height: 200px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  /* Add any other styling properties you need */
`;

const Title = styled.h2`
  color: #000;
  /* Customize font size, weight, etc. */
`;

const Number = styled.p`
  color: green;
  font-size: 24px;
  /* Adjust font size and other styles */
`;

const ProgressBar = styled.div`
  height: 10px;
  width: 90%;
  background-color: #e0e0df;
  border-radius: 5px;
  margin-top: 20px;
  /* Customize other properties as desired */
`;

const FillBar = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #3b5998;
  border-radius: 5px;
  /* Adjust width based on data (e.g., props.width = 60 for 60% completion) */
`;

const PieChart = styled.img.attrs((props) => ({
  src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23e0e0df' /%3E%3Ccircle cx='50' cy='50' r='40' fill='%233b5998' stroke='%23fff' stroke-width='2' stroke-dasharray='60 40' transform='rotate(-90 50 50)' /%3E%3C/svg%3E",
  alt: "Pie Chart",
  width: 100,
  height: 100,
}))``;

export default function DashboardCard() {
  return (
    <Card>
      <Title>New Patients</Title>
      <Number>125</Number>
      <ProgressBar>
        <FillBar width={60} />
      </ProgressBar>
      <PieChart />
    </Card>
  );
}
