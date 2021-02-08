import React from "react";
import { View, StyleSheet } from "react-native";
import {connect} from "react-redux";
import { Button, Text } from "react-native-elements"
import generalStyles, {generalNativeStyles} from "./../../styles/GeneralStyles"
import {switchContent} from "../../actions/teacherNavigationActions";
import {CREATE_OR_EDIT_USER_IDENTIFIER} from "../general/identifiers";
import {setIsUserBeingEdited} from "../../actions/adminActions";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
})

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
        <View id={"mainview"} style={generalNativeStyles.root}>
            <Text style={generalNativeStyles.siteHeading}>
                Nutzerverwaltung
            </Text>
                <Button
                    buttonStyle={generalNativeStyles.button1}
                    containerStyle={generalNativeStyles.buttonContainerStyle}
                    onPress={handleCreateUserClick}
                    title={"Nutzer anlegen"}
                >
                </Button>
        </View>
    )
}

export default connect((state) => ({}), {switchContent, setIsUserBeingEdited})(userAdministration)
