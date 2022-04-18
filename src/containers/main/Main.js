import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/NavbarContainer";
import SnackbarContainer from "../snackbar/SnackbarContainer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import serverUrl from "../../config";
export default function Main() {
  const snackbar = useSelector((state) => state.snackbar);
  const auth = useSelector((state) => state.auth)
  const [user,setUser] = useState({});
  const checkIn = async () => {
    console.log(auth)
    try {
      axios
        .get(`${serverUrl}/api/v1/headers`, {
          withCredentials: true,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      const res = await axios.get(`${serverUrl}/api/v1/profile`, {
        withCredentials: true,
      });
      setUser(res.data);
    };
    if (auth.status === true){
      console.log("true")
    } else {
      getUserProfile();
    }
  }, []);

  return (
    <Box height="100vh">
      <Navbar />
      <Outlet user={user} />
      <SnackbarContainer
        open={snackbar.status}
        success={true}
        message={snackbar.message}
        severity={snackbar.severity}
      />
      <button onClick={checkIn}> check in </button>
    </Box>
  );
}
