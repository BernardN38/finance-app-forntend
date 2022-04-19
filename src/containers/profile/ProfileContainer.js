import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import axios from "axios";
import serverUrl from "../../config";


export default function ProfileContainer() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUserProfile = async () => {
      const res = await axios.get(`${serverUrl}/api/v1/profile`, {
        withCredentials: true,
      });
      setUser(res.data);
    };
    getUserProfile();
  }, []);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ProfileHeader user={user} />
      <ProfileBody />
    </Box>
  );
}
