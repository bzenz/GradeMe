import React from "react";
import {connect} from "react-redux";
import {Button, Typography} from "@material-ui/core";
import generalStyles from "./../../styles/GeneralStyles"
import {switchContent} from "../../actions/teacherNavigationActions";
import {CREATE_OR_EDIT_USER_IDENTIFIER} from "../general/identifiers";
import {setIsUserBeingEdited} from "../../actions/adminActions";

function userAdministration(props) {
    const generalStyle = generalStyles();

    const handleCreateUserClick = () => {
        props.switchContent(CREATE_OR_EDIT_USER_IDENTIFIER);
    }

    const handleEditUserClick = () => {
        props.setIsUserBeingEdited(true);
        props.switchContent(CREATE_OR_EDIT_USER_IDENTIFIER);
    }

    const handleDeleteUserClick = () => {

    }

    const editUserButton = () => {
        return (
            <Button className={generalStyle.button1} onClick={() => handleEditUserClick}>
                Nutzer bearbeiten
            </Button>
        )
    }

    const deleteUserButton = () => {
        return (
            <Button className={generalStyle.button1} onClick={() => handleDeleteUserClick}>
                Nutzer deaktivieren
            </Button>
        )
    }
    return (
        <div>
            <Typography className={generalStyle.siteHeading}>
                Nutzerverwaltung
            </Typography>
            <Button className={generalStyle.button2} onClick={() => handleCreateUserClick()}>
                Nutzer anlegen
            </Button>

        </div>
    )
}

export default connect((state) => ({}), {switchContent, setIsUserBeingEdited})(userAdministration)
