import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useDispatch } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SimpleSnackbar({ open, message, severity }) {
  const dispatch = useDispatch();

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  const handleClose = () => {
    dispatch({ type: "SET_SNACKBAR_MESSAGE", payload: "" });
    dispatch({ type: "SET_SNACKBAR_FALSE" });
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message="Note archived"
        // action={action}
        TransitionComponent={SlideTransition}
        onClose={handleClose}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
