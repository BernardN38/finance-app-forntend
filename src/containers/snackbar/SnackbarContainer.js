import React, {useState} from "react";
import SimpleSnackbar from "./Snackbar";
import { useSelector } from "react-redux";

export default function SnackbarContainer({open, message, severity}){

    return (
        <div>
            <SimpleSnackbar open={open} message={message} severity={severity}/>
        </div>
    )
}