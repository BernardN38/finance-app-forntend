import React from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage"
import {Box} from "@mui/material";

export default function AuthContainer({type}){

    return (
        <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
            {type === 'login' ? <LoginPage/> : <SignupPage/>}
        </Box>
    )
}