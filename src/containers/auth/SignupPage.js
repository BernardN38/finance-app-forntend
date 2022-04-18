import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import serverUrl from "../../config";

const theme = createTheme();

export default function SignupPage() {
  const [validation, setValidation] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await axios.post(`${serverUrl}/api/v1/auth/register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 201) {
        dispatch({ type: "SET_SNACKBAR_MESSAGE", payload: res.statusText });
        dispatch({ type: "SET_SNACKBAR_SEVERITY", payload: "success" });
        dispatch({ type: "SET_SNACKBAR_TRUE" });
        navigate("/");
      }
    } catch (err) {
      console.log(err.response);
      dispatch({ type: "SET_SNACKBAR_MESSAGE", payload: "Invalid Input" });
      dispatch({ type: "SET_SNACKBAR_SEVERITY", payload: "error" });
      dispatch({ type: "SET_SNACKBAR_TRUE" });
    }
  };

  const checkvalid = (e) => {
    console.log(e.target.id);
    if (e.target.value.length > 5) {
      setValidation({ ...validation, [e.target.id]: false });
    } else {
      setValidation({ ...validation, [e.target.id]: true });
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
          <Typography component="h1" variant="h5">
            Create Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              autoFocus
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              error={validation.firstName}
              onChange={checkvalid}
            />
            <TextField
              margin="normal"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="last_name"
              error={validation.lastName}
              onChange={checkvalid}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              error={validation.email}
              onChange={checkvalid}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
              error={validation.username}
              onChange={checkvalid}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={validation.password}
              onChange={checkvalid}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
