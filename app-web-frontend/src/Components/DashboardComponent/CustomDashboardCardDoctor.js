import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CustomDashboardCardDoctor = ({ bloodSugarLevel, title, statusLabel }) => {
  // Initialize chartData with an empty array if it's undefined
  const [chartData, setChartData] = useState([
    { x: "Day 1", y: 80 },
    { x: "Day 2", y: 85 },
    { x: "Day 3", y: 78 },
    // Add more data points as needed
  ]);

  // Only render LineChart if chartData is defined
  const renderLineChart = () => {
    if (chartData) {
      const dataset = chartData.map((data) => ({
        x: data.x,
        y: data.y,
      }));

      return (
        <ResponsiveContainer width="110%" height={80}>
          <LineChart
            margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
              },
            ]}
            width={300}
            height={200}
          />
        </ResponsiveContainer>
      );
    } else {
      return null; // Return null if chartData is undefined
    }
  };

  return (
    <Card
      style={{
        border: "1px solid #e6e6e6",
        borderRadius: "8px",
        width: "200px",
        height: "200px",
        padding: "10px",
        margin: "20px",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h5">{bloodSugarLevel} mg/dL</Typography>
        <Typography variant="subtitle1">{statusLabel}</Typography>
        {renderLineChart()}
      </CardContent>
    </Card>
  );
};

export default CustomDashboardCardDoctor;
