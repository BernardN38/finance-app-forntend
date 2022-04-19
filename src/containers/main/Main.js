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
  const auth = useSelector((state) => state.auth);
  const dispatch =  useDispatch();

  const checkIn = async () => {
    console.log(auth);
    try {
      axios
        .get(`${serverUrl}/api/v1/token/checkin`, {
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
      let res;
      try {
        res = await axios.get(`${serverUrl}/api/v1/profile`, {
          withCredentials: true,
        });
        console.log(res.data)
        dispatch({ type: "SET_AUTH_TRUE" });
        dispatch({ type: "SET_USER_TOKEN", payload: {user_id:res.data.id, ...res.data} });
      } catch (err) {
        console.log(err.response.data);
      }
    };
    if (auth.status != true) {
      getUserProfile();
    }
  }, []);

  return (
    <Box height="100vh">
      <Navbar />
      <Outlet />
      <SnackbarContainer
        open={snackbar.status}
        success={true}
        message={snackbar.message}
        severity={snackbar.severity}
      />
      {/* <button onClick={checkIn}> check in </button> */}
    </Box>
  );
}
