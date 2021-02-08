import React from 'react';
import {connect} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {logoutAction} from "../../actions/loginActions";
import localStorage from "../../../utils/localStorageMock";
import generalStyles from "../../styles/GeneralStyles";
import navigationStyles from "../../styles/NavigationStyle";
import {Typography} from "@material-ui/core";

function LogoutButton(props) {
    const generalStyle = generalStyles();
    const navigationStyle = navigationStyles();
    function handleLogout(){
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("request_token");
        props.logoutAction();
    }

    return (
        <IconButton
            className={generalStyle.button1}
            color="inherit"
            onClick={handleLogout}>

            <ExitToAppIcon/>
            <Typography className={navigationStyle.appBarFont1}>
                Logout
            </Typography>

        </IconButton>
    )
}

export default connect (null, {logoutAction})(LogoutButton)
