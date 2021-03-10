import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text } from 'react-native';
import {connect} from "react-redux";
import {generalNativeStyles} from "../../styles/GeneralStyles";
import {Button, Input, ListItem, Card, CheckBox } from "react-native-elements";
import {SERVER} from "../../../index";
import {setErrorData} from "../../actions/errorActions";

const customStyles = StyleSheet.create({
    subjectCard: {
        width: '100%',
    },
    deactivatedSubjectCard: {
        width: '100%',
        backgroundColor: "#e0e0e0",
    },
    listItemContent: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    button1: {
       padding: "40px",
    },
    checkBoxContainerStyle: {
        backgroundColor: "#ffffff",
        borderWidth: 0,
    },
})

function subjectAdministration(props) {
    const [,setState] = useState();  //Wird für ein Forceupdate genutzt
    const [showNewSubjectInputField, setShowNewSubjectInputField] = useState(false);
    const [subjectList, setSubjectList] = useState([]);
    const [newSubjectInputFieldErrorMessage, setNewSubjectInputFieldErrorMessage] = useState("");
    const [editedSubjectId, setEditedSubjectId] = useState(null);
    const [showDeactivatedSubjectsCheckBoxIsEnabled, setShowDeactivatedSubjectsCheckBoxIsEnabled] = useState(false);

    useEffect(() => {
        const requestBody = JSON.stringify({request_token: props.request_token})
        fetch(SERVER + "/api/subject/getAll",
            {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": requestBody
            }).then(response => response.json())
            .then(data => setSubjectList(data.reverse()))
    }, [])

    const handleCreateSubjectClick = () => {
        setShowNewSubjectInputField(true);
    }

    let subjectEditTextfield = "";
    const handleEditSubjectClick = (_editedSubjectId, editedSubjectName) => {
        setEditedSubjectId(_editedSubjectId);
        subjectEditTextfield = editedSubjectName;
    }

    //Neues Fach erstellen
    let newSubjectNameField = "";
    const handleSaveSubject = () => {
        if(newSubjectNameField === "") {
            setNewSubjectInputFieldErrorMessage("Der Name des Fachs darf nicht leer sein");
            return;
        }

        const setNewSubjectIdAndSetNewSubjectList = (newSubjectId) => {
            const newSubjectList = subjectList;
            newSubjectList.unshift({subjectId: newSubjectId.subjectId, subjectName: newSubjectNameField, deactivated: false});
            setSubjectList(newSubjectList);
            setNewSubjectInputFieldErrorMessage("");
            setShowNewSubjectInputField(false);
            newSubjectNameField = "";
        }
        const requestBody = JSON.stringify({
            request_token: props.request_token,
            name: newSubjectNameField
        })
        fetch(SERVER + "/api/subject/create",
            {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": requestBody,
            }).then(response => response.json())
            .then((data) => (setNewSubjectIdAndSetNewSubjectList(data)))
    }

    //Fach editieren
    const handleSaveEditedSubjectName = () => {
        for (let i = 0; i< subjectList.length; i++){
            if(subjectList[i].subjectId === editedSubjectId){
                subjectList[i].subjectName = subjectEditTextfield;
                const requestBody = JSON.stringify({subjectId: editedSubjectId, newName: subjectEditTextfield,request_token: props.request_token})
                fetch(SERVER + "/api/subject/edit",
                    {
                        "method": "POST",
                        "headers": {'Content-Type': 'application/json'},
                        "body": requestBody
                    })
                setEditedSubjectId(null);
                break;
            }
        }
    }

    //Fach aktivieren/deaktivieren
    const changeSubjectStatus = (subjectId, deactivate) => {

        const requestBody = JSON.stringify(
            {
                subjectId: subjectId ,
                deactivated: deactivate,
                request_token: props.request_token,
            })
        fetch(SERVER + "/api/subject/setDeactivated",
            {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": requestBody
            });

        for (let i = 0; i < subjectList.length; i++){
            if(subjectList[i].subjectId === subjectId){
                /*Macht man eigentlich nicht so. Um Hooks zu setzen sollte man die entsprechende setHook-Methode aufrufen
                Deshalb brauchts hier auch den Forcererender.
                Es gibt ne Möglichkeit das sauberer zu machen, aber so funktioniert es halt erstmal...quick and dirty */
                subjectList[i].deactivated = deactivate;
                setState({});
                break;
            }
        }
    }

    return (
        //Header
        <View style={generalNativeStyles.root}>
            <Text style={generalNativeStyles.siteHeading}>
                Fächerverwaltung
            </Text>
            <Button
                buttonStyle={generalNativeStyles.button1}
                containerStyle={{width: "70%"}}
                onPress={handleCreateSubjectClick}
                title={"Fach hinzufügen"}
            />
            <CheckBox
                title={"Deaktivierte Fächer anzeigen"}
                checked={showDeactivatedSubjectsCheckBoxIsEnabled}
                containerStyle={customStyles.checkBoxContainerStyle}
                onPress={() => (setShowDeactivatedSubjectsCheckBoxIsEnabled(!showDeactivatedSubjectsCheckBoxIsEnabled))}
            />
            {showNewSubjectInputField?
                <Card containerStyle={customStyles.subjectCard}>
                    <Input
                        style={[generalNativeStyles.halfWidth, generalNativeStyles.marginTop]}
                        onChangeText={textinput => newSubjectNameField = textinput}
                        errorMessage={newSubjectInputFieldErrorMessage}
                    />
                    <Button title={"Fach speichern"} buttonStyle={generalNativeStyles.button1} onPress={() => handleSaveSubject()}/>
                </Card>
           : null}

            {/*SubjectList*/}
            {subjectList.map((listItem) => {
                if(showDeactivatedSubjectsCheckBoxIsEnabled || !listItem.deactivated) {
                    return (
                        <Card containerStyle={listItem.deactivated?customStyles.deactivatedSubjectCard:customStyles.subjectCard}>
                            <ListItem containerStyle={listItem.deactivated?{backgroundColor: "#e0e0e0"}:null}>
                                <ListItem.Content style={customStyles.listItemContent}>
                                    <ListItem.Content style={{maxWidth: "25%"}}>
                                        <Text style={{fontSize: 22}}>
                                            {"FachId: " + listItem.subjectId}
                                        </Text>
                                    </ListItem.Content>
                                    {editedSubjectId === listItem.subjectId ?
                                        <ListItem.Content>
                                            <Input
                                                defaultValue={listItem.subjectName}
                                                label={"Neuer Fachname"}
                                                onChangeText={textinput => subjectEditTextfield = textinput}
                                            />
                                        </ListItem.Content> :
                                        <ListItem.Content>
                                            <Text style={{fontSize: 22}}>
                                                {listItem.subjectName}
                                            </Text>
                                        </ListItem.Content>
                                    }
                                    {editedSubjectId === listItem.subjectId ?
                                        <Button
                                            title={"Speichern"}
                                            buttonStyle={[generalNativeStyles.button1, generalNativeStyles.marginRight, {backgroundColor: "#00f459"}]}
                                            onPress={() => handleSaveEditedSubjectName()}
                                        /> :
                                        <Button
                                            title={"Bearbeiten"}
                                            buttonStyle={[generalNativeStyles.button1, generalNativeStyles.marginRight]}
                                            onPress={() => handleEditSubjectClick(listItem.subjectId, listItem.subjectName)}
                                        />
                                    }
                                    {listItem.deactivated?
                                        <Button
                                            title={"Aktivieren"}
                                            buttonStyle={generalNativeStyles.button1}
                                            onPress={() => changeSubjectStatus(listItem.subjectId, false)}
                                       />:
                                        <Button
                                            title={"Deaktivieren"}
                                            buttonStyle={generalNativeStyles.button1}
                                            onPress={() => changeSubjectStatus(listItem.subjectId, true)}
                                        />
                                    }

                                </ListItem.Content>

                            </ListItem>
                        </Card>
                    )
                }
            })}
        </View>

    )
}

export default connect((state) => ({request_token: state.loginReducer.request_token}), {setErrorData})(subjectAdministration)
