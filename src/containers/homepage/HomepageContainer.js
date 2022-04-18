import React from "react";
import { Box } from "@mui/material";
import HompageBody from "./HompageBody";
import SneakpeekContainer from "../sneakpeek/SneakpeekContainer";
import "./HomepageContainer.css";


export default function HomepageContainer() {
  return (
    <Box className="homepage-main">
      <Box className="hompage-content">
        <SneakpeekContainer />
        <HompageBody />
      </Box>
      <Box className="homepage-bg"></Box>
    </Box>
  );
}
