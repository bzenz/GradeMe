import React from 'react';
import {connect} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {logoutAction} from "../actions/loginActions";

function LogoutButton(props) {
    function handleLogout(){
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("request_token");
        props.logoutAction();
    }

    return (
        <IconButton
            color="inherit"
            onClick={handleLogout}>
            <ExitToAppIcon/>
                Logout
        </IconButton>
    )
}

export default connect (null, {logoutAction})(LogoutButton)
