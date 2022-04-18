import React from "react";
import { Box } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpendingChart({ data, options }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", height: "80vw" }}>
      <Pie data={data} options={options} />
    </Box>
  );
}
