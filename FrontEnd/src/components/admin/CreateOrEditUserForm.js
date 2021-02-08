import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import {connect} from "react-redux";
import {generalNativeStyles} from "../../styles/GeneralStyles"
import { Button, Card, Input, Text} from "react-native-elements"
import {SERVER} from "../../../index";
import { USER_ADMINISTRATION_IDENTIFIER} from "../general/identifiers";
import {switchContent} from "../../actions/teacherNavigationActions";
import {CheckBox} from "react-native-elements";

const customstyles = StyleSheet.create({
    checkBoxView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    checkBoxContainerStyle: {
        backgroundColor: "#ffffff",
        borderWidth: 0,
    },
    cardStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

function CreateOrEditUserForm(props) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [role, setRole] = useState("student");
    const [firstnameFieldFilled, setFirstnameFieldFilled] = useState(true);
    const [lastnameFieldFilled, setLastnameFieldFilled] = useState(true);
    const [studentChecked, setStudentChecked] = useState(true);
    const [teacherChecked, setTeacherChecked] = useState(false);
    const [adminChecked, setAdminChecked] = useState(false);

    function handleFormChange(value, type) {
        switch (type) {
            case "firstname": setFirstname(value); break;
            case "lastname": setLastname(value); break;
        }
    }
    const handleRoleSelectionChange = (role) => {
        setRole(role);
        switch (role) {
            case "student":
                setStudentChecked(true);
                setTeacherChecked(false);
                setAdminChecked(false);
                break;
            case "teacher":
                setStudentChecked(false);
                setTeacherChecked(true);
                setAdminChecked(false);
                break;
            case "admin":
                setStudentChecked(false);
                setTeacherChecked(false);
                setAdminChecked(true);
                break;
            default:
                setStudentChecked(false);
                setTeacherChecked(false);
                setAdminChecked(false);
        }
    }

    if(props.isUserBeingEdited) {
        
    }

    function submitTaskForm(){
        let isFirstnameFieldFilled = (firstname !== "");
        let isLastnameFieldFilled = (lastname !== "");
        setFirstnameFieldFilled(isFirstnameFieldFilled);
        setLastnameFieldFilled(isLastnameFieldFilled);

        /* Der Grund dafür, dass hier der Wert der Variablen "isFirstNameFieldFilles" bzw. "isLastnameFieldFilled"
           abgefragt wird, ist dass Hooks zu setzen eine ansyncrone Funktion ist. D.h. ich kann nicht den Ausdruck
           (firstname !== "") bzw. (lastname !== "") auswerten, ihn als Hook setzen und direkt danach
           die Hook abfragen, da sich die Hook noch nicht aktualisiert hat.
           Deshalb muss man hier leider sowohl Hooks als auch normale Variablen nutzen */
        if( !isFirstnameFieldFilled || !isLastnameFieldFilled){
            alert("Nicht alle Pflichtfelder wurden ausgefüllt.");
            return;
        }

        const password = firstname.substring(0, 1) + lastname.substring(0, 1);
        let requestBody = {
            vorname: firstname,
            name: lastname,
            rolle: role,
            password: password,
            request_token: props.request_token,
        };
        fetch(SERVER + "/api/user/create", {
            "method": "POST",
            "headers": {'Content-Type': 'application/json'},
            "body": JSON.stringify(requestBody)
        })
        alert("Nutzer wurde erstellt");
        props.switchContent(USER_ADMINISTRATION_IDENTIFIER)
    }

    return (
        <View style={generalNativeStyles.root}>
            <Text style={generalNativeStyles.siteHeading}>
                Nutzer anlegen
            </Text>
            <Card containerStyle={customstyles.cardStyle} >
                <Input
                    error={ !firstnameFieldFilled }
                    id="firstname"
                    label="Vorname"
                    variant="outlined"
                    onChangeText={(value) => {handleFormChange(value, "firstname")}}
                />

                <Input
                    error={ !lastnameFieldFilled }
                    id="lastname"
                    label="Nachname"
                    variant="outlined"
                    onChangeText={(value) => {handleFormChange(value, "lastname")}}
                />
                <View style={customstyles.checkBoxView}>
                    <CheckBox
                        title='Schüler'
                        checked={studentChecked}
                        containerStyle={customstyles.checkBoxContainerStyle}
                        onPress={() => handleRoleSelectionChange("student")}
                    />
                    <CheckBox
                        title='Lehrer'
                        checked={teacherChecked}
                        containerStyle={customstyles.checkBoxContainerStyle}
                        onPress={() => handleRoleSelectionChange("teacher")}
                    />
                    <CheckBox
                        title='Administrator'
                        checked={adminChecked}
                        containerStyle={customstyles.checkBoxContainerStyle}
                        onPress={() => handleRoleSelectionChange("admin")}
                    />
                </View>
                    <Button
                        title={"Nutzer erstellen"}
                        buttonStyle={generalNativeStyles.button1}
                        containerStyle={generalNativeStyles.buttonContainerStyle}
                        onPress={() => submitTaskForm()}>
                        {/*Kommt erst später, wenn die Icons für Mobilansicht umgesetzt sind*/}
                        {/*icon={<NoteAddIcon/>}*/}

                </Button>
            </Card>
        </View>
    )
}

export default connect((state) => ({
    request_token: state.loginReducer.request_token,
    isUserBeingEdited: state.adminReducer.isUserBeingEdited,
}), {switchContent})(CreateOrEditUserForm)