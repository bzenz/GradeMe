import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text } from 'react-native';
import {connect} from "react-redux";
import {generalNativeStyles} from "../../styles/GeneralStyles";
import {Button, Input, ListItem, Card } from "react-native-elements";
import {subjectMockArray} from "../../../utils/mocks";

const customStyles = StyleSheet.create({
    subjectCard: {
        width: '100%',
    },
    listItemContent: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-evenly'
    },
    button1: {
       padding: "40px",
    }
})

function subjectAdministration() {
    const [showNewSubjectInputField, setShowNewSubjectInputField] = useState(false);
    const [subjectList, setSubjectList] = useState([]);
    const [newSubjectNameField, setNewSubjectNameField] = useState("");
    const [newSubjectInputFieldErrorMessage, setNewSubjectInputFieldErrorMessage] = useState("");
    const [editedSubjectId, setEditedSubjectId] = useState(null);
    const [subjectEditTextfield, setSubjectEditTextfield] = useState("");

    useEffect(() => {
        setSubjectList(subjectMockArray.reverse());
    }, [])


    const handleCreateSubjectClick = () => {
        setShowNewSubjectInputField(true);
    }

    const handleEditSubjectClick = (_editedSubjectId, editedSubjectName) => {
        setEditedSubjectId(_editedSubjectId);
        setSubjectEditTextfield(editedSubjectName);
    }

    const handleSaveEditedSubjectName = () => {
        for (let i = 0; i< subjectList.length; i++){
            if(subjectList[i].Id === editedSubjectId){
                subjectList[i].name = subjectEditTextfield;
                setEditedSubjectId(null);
                break;
            }
        }
    }

    const handleDeactivateSubject = () => {
        alert("Diese Funktion ist noch nicht verfügbar");
    }

    const handleSaveSubject = () => {
        if(newSubjectNameField === "") {
            setNewSubjectInputFieldErrorMessage("Der Name des Fachs darf nicht leer sein");
            return;
        }
        let highestId = 0;
        subjectList.forEach((element) => {
            if(element.Id > highestId){
                highestId = element.Id;
        }
        })
        const newSubjectList = subjectList;
        newSubjectList.unshift({Id: ++highestId, name: newSubjectNameField});
        setSubjectList(newSubjectList);
        setNewSubjectNameField("");
        setNewSubjectInputFieldErrorMessage("");
        setShowNewSubjectInputField(false);
    }

    return (
        <View style={generalNativeStyles.root}>
            <Text style={generalNativeStyles.siteHeading}>
                Fächerverwaltung
            </Text>
            <Button
                buttonStyle={generalNativeStyles.button1}
                containerStyle={{width: "70%"}}
                onPress={handleCreateSubjectClick}
                title={"Fach hinzufügen"}
            >
            </Button>
            {showNewSubjectInputField?
                <Card containerStyle={customStyles.subjectCard}>
                    <Input
                        style={[generalNativeStyles.halfWidth, generalNativeStyles.marginTop]}
                        onChangeText={textinput => setNewSubjectNameField(textinput)}
                        errorMessage={newSubjectInputFieldErrorMessage}
                    />
                    <Button title={"Fach speichern"} buttonStyle={generalNativeStyles.button1} onPress={() => handleSaveSubject()}/>
                </Card>
           : null}


            {subjectList.map((listItem) => {
                return (
                    <Card containerStyle={customStyles.subjectCard}>
                        <ListItem >
                            <ListItem.Content style={customStyles.listItemContent}>
                                <ListItem.Content style={{ maxWidth: "25%"}}>
                                    <Text style={{fontSize: 22}}>
                                        {"FachId: " + listItem.Id}
                                    </Text>
                                </ListItem.Content>
                                {editedSubjectId === listItem.Id?
                                    <ListItem.Content>
                                        <Input
                                            defaultValue={listItem.name}
                                            label={"Neuer Fachname"}
                                            onChangeText={textinput => setSubjectEditTextfield(textinput)}
                                        />
                                    </ListItem.Content>:
                                    <ListItem.Content >
                                        <Text style={{fontSize: 22}}>
                                            {listItem.name}
                                        </Text>
                                    </ListItem.Content>
                                }
                                {editedSubjectId === listItem.Id?
                                    <Button
                                        title={"Speichern"}
                                        buttonStyle={[generalNativeStyles.button1, generalNativeStyles.marginRight,{ backgroundColor: "#00f459"}]}
                                        onPress={() => handleSaveEditedSubjectName()}
                                    />:
                                    <Button
                                        title={"Bearbeiten"}
                                        buttonStyle={[generalNativeStyles.button1, generalNativeStyles.marginRight]}
                                        onPress={() => handleEditSubjectClick(listItem.Id, listItem.name)}
                                    />
                                }
                                <Button
                                    title={"Deaktivieren"}
                                    buttonStyle={generalNativeStyles.button1}
                                    onPress={() => handleDeactivateSubject()}
                                />
                            </ListItem.Content>

                        </ListItem>
                    </Card>
                    )
            })}
        </View>
    )
}

export default connect()(subjectAdministration)
