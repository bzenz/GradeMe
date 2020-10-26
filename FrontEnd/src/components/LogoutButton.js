import React from 'react';
import {connect} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
function LogoutButton(props) {

    function handleLogout(){
        localStorage.clear();
        props.handleLogout();
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

export default connect ()(LogoutButton)