import React from "react";
import { Box, Avatar } from "@mui/material";

export default function ({ user }) {
  console.log(user);
  return (
    <Box
      sx={{
        // borderBottom: "1px solid grey",
        boxShadow: "1px",
        width: "90%",
        margin: "5px",
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar alt={user.firstName} src="/static/images/avatar/1.jpg" />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <Box>{user.firstName}</Box>
        <Box>{user.lastName}</Box>
        <Box>{user.email}</Box>
      </Box>
    </Box>
  );
}
