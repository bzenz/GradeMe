import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import {connect} from "react-redux";
import { Button, Text } from "react-native-elements"
import generalStyles, {generalNativeStyles} from "./../../styles/GeneralStyles"
import {switchContent} from "../../actions/teacherNavigationActions";
import {CREATE_OR_EDIT_USER_IDENTIFIER} from "../general/identifiers";
import {setIsUserBeingEdited} from "../../actions/adminActions";
import SearchListComponent from "../SearchListComponent";
import {setErrorData} from "../../actions/errorActions";
import {SERVER} from "../../../index";
import {usermockarray1} from "../../../utils/mocks";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
})

function userAdministration(props) {
    const generalStyle = generalStyles();
    const [userList, setUserList] = useState([]);

    try {
        useEffect(() => {
            fetch(SERVER + "/api/user/getAll",
                {
                    "method": "POST",
                    "headers": { 'Content-Type': 'application/json' },
                    "body": JSON.stringify({request_token: props.request_token})
                })
                .then(response => response.json())
                .then(data => setUserList(data))
        }, [])

    } catch (exception) {
        props.setErrorData("Es konnte keine Verbindung zum GradeMe-Server hergestellt werden.");
        console.error("Es konnte keine Verbindung zum Backend hergestellt werden.\n" + "Errormessage: " + exception.message + "\nStacktrace:\n" + exception.stack);
        return null;
    }

    const handleCreateUserClick = () => {
        props.switchContent(CREATE_OR_EDIT_USER_IDENTIFIER);
    }



    const editUserButton = (userId) => {
        return (
            <Button
                buttonStyle={[generalNativeStyles.button1, generalNativeStyles.marginRight]}
                title={"Bearbeiten"}
                onPress={(userId) => handleEditUserClick(userId)}
            />
        )
    }
    const deactivateUserButton = () => {
        return (
            <Button
                buttonStyle={generalNativeStyles.button1}
                title={"Deaktivieren"}
                onPress={() => handleDeactivateUserClick()}
            />
        )
    }

    return (
        <View id={"mainview"} style={[generalNativeStyles.root, generalNativeStyles.fullWidth]}>
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
            <SearchListComponent
                isTwoListComponent={false}
                searchListHeading={"Eingetragene Nutzer"}
                searchList={userList}
                tableHeadWords={["Id", "Benutzername", "vorname", "name", "Rolle"]}
                searchOptionArray={[{value: "loginName", displayedString: "Benutzername"}, {value: "vorname", displayedString: "Vorname"}, {value: "name", displayedString: "Nachname"}]}
                defaultSelectedSearchOption={"loginName"}
                filterOptionArray={[{value: "all", displayedString: "Alle"}, {value: "student", displayedString: "Schüler"}, {value: "teacher", displayedString: "Lehrer"}]}
                filterParameter={"rolle"}
                buttonListForTableEntry={[editUserButton(), deactivateUserButton()]}
            />
        </View>
    )
}

export default connect((state) => ({request_token: state.loginReducer.request_token}), {switchContent, setIsUserBeingEdited, setErrorData})(userAdministration)
