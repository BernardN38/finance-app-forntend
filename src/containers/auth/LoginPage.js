import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import axios from "axios";
import serverUrl from "../../config";
import { useNavigate } from "react-router-dom";
import {Link as Link2} from "react-router-dom";
const theme = createTheme();



export default function Login({open,setOpen}) {
  const dispatch =  useDispatch();
  const navigate = useNavigate();

  const error = (err) =>{
        dispatch({ type: "SET_SNACKBAR_MESSAGE", payload: "Error when loggin in" });
        dispatch({ type: "SET_SNACKBAR_SEVERITY", payload: "error" });
        dispatch({ type: "SET_SNACKBAR_TRUE" });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await axios.post(`${serverUrl}/api/v1/auth/login`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      if (res.status === 200) {
        dispatch({ type: "SET_SNACKBAR_MESSAGE", payload: res.statusText });
        dispatch({ type: "SET_SNACKBAR_SEVERITY", payload: "success" });
        dispatch({ type: "SET_USER_TOKEN", payload: res.data });
        dispatch({ type: "SET_SNACKBAR_TRUE" });
        dispatch({ type: "SET_AUTH_TRUE" });
        navigate("/profile");
      } else {
        error()
      }
    } catch (err) {
        error(err)
    }
    
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              id="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" component={Link2} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"></Link>
              </Grid>
              <Grid>
                <Link variant="body2">
                  Business Login
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
