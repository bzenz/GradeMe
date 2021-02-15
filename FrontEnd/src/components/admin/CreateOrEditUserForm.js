import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import {connect} from "react-redux";
import {generalNativeStyles} from "../../styles/GeneralStyles"
import { Button, Card, Input, Text, CheckBox } from "react-native-elements"
import {SERVER} from "../../../index";
import { USER_ADMINISTRATION_IDENTIFIER} from "../general/identifiers";
import {switchContent} from "../../actions/teacherNavigationActions";
import {setIsUserBeingEdited} from "../../actions/adminActions";
import CancelButton from "../general/CancelButton";

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
    const [userData, setUserData] = useState({});
    const [firstnameFieldFilled, setFirstnameFieldFilled] = useState(true);
    const [lastnameFieldFilled, setLastnameFieldFilled] = useState(true);
    const [studentChecked, setStudentChecked] = useState(false);
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

    const useFetchResponse = (data) => {
        setUserData(data);
        setFirstname(data.vorname);
        setLastname(data.name);
        switch (data.rolle) {
            case "student": setStudentChecked(true); break;
            case "teacher": setTeacherChecked(true); break;
            case "admin": setAdminChecked(true); break;
            default: setStudentChecked(true);
        }
    }

    if(props.isUserBeingEdited) {
        useEffect(() => {
            fetch(SERVER + "/api/user/getData",
                {
                    "method": "POST",
                    "headers": { 'Content-Type': 'application/json' },
                    "body": JSON.stringify({
                        request_token: props.request_token,
                        userId: props.editedUserId
                    })
                }).then(response => response.json())
                .then(data => useFetchResponse(data))
        }, [])
    } else {
        useEffect(() => {
            setStudentChecked(true);
        })
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

        if(props.isUserBeingEdited){
            requestBody = {
                vorname: firstname,
                name: lastname,
                rolle: role,
                request_token: props.request_token,
            };
            fetch(SERVER + "/api/user/edit", {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": JSON.stringify(requestBody)
            })
            alert("Nutzerbearbeitung abgesendet. Leider ist die Funktionalität im Backend noch nicht umgesetzt, sodass die veränderten Userdaten nicht angezeigt werden");
        } else {
            fetch(SERVER + "/api/user/create", {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": JSON.stringify(requestBody)
            })
            alert("Nutzer erstellt. Leider ist die Funktionalität im Backend noch nicht umgesetzt, sodass der neu angelegte Nutzer noch nicht gespeicher werde konnte.");
        }
        props.setIsUserBeingEdited(false);
        props.switchContent(USER_ADMINISTRATION_IDENTIFIER)
    }

    return (
        <View style={generalNativeStyles.root}>
            <Text style={generalNativeStyles.siteHeading}>
                Nutzer anlegen
            </Text>
            <Card containerStyle={customstyles.cardStyle} >
                <Input
                    id="firstname"
                    label="Vorname"
                    defaultValue={props.isUserBeingEdited?userData.vorname:""}
                    variant="outlined"
                    error={ !firstnameFieldFilled }
                    onChangeText={(value) => {handleFormChange(value, "firstname")}}
                />

                <Input
                    error={ !lastnameFieldFilled }
                    id="lastname"
                    label="Nachname"
                    defaultValue={props.isUserBeingEdited?userData.name:""}
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
                    title={props.isUserBeingEdited?"Nutzer bearbeiten":"Nutzer erstellen"}
                    buttonStyle={generalNativeStyles.button1}
                    onPress={() => submitTaskForm()}>
                </Button>
                <CancelButton/>
            </Card>
        </View>
    )
}

export default connect((state) => ({
    request_token: state.loginReducer.request_token,
    isUserBeingEdited: state.adminReducer.isUserBeingEdited,
    editedUserId: state.adminReducer.editedUserId,
}), {switchContent, setIsUserBeingEdited})(CreateOrEditUserForm)