import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import {connect} from "react-redux";
import {generalNativeStyles} from "../../styles/GeneralStyles"
import { Button, Card, Input, Text } from "react-native-elements"
import {SERVER} from "../../../index";
import {COURSE_ADMINISTRATION_IDENTIFIER} from "../general/identifiers";
import {switchContent} from "../../actions/teacherNavigationActions";
import {setIsUserBeingEdited} from "../../actions/adminActions";
import CancelButton from "../general/CancelButton";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import SearchListComponent from "../SearchListComponent";
import makeStyles from "@material-ui/core/styles/makeStyles";


const customStyles = StyleSheet.create({
    cardStyle: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

const useStyles = makeStyles(() => ({
    formControlStyle: {
        width: '30%',
        minWidth: 140,
    }
}))

function CreateOrEditCourseForm(props) {
    const customClasses = useStyles();
    const [selectedSubjectId, setSelectedSubjectId] = useState("");
    const [year, setYear] = useState();
    const [subjectList, setSubjectList] = useState([]);
    const [allUser, setAllUser] = useState([]);

    useEffect(() => {
        fetch(SERVER + "/api/subject/getAll",
            {
                "method": "POST",
                "headers": { 'Content-Type': 'application/json' },
                "body": JSON.stringify({
                    request_token: props.request_token,
                })
            }).then(response => response.json())
            .then(data => setSubjectList(data))

        fetch(SERVER + "/api/user/getAll",
            {
                "method": "POST",
                "headers": { 'Content-Type': 'application/json' },
                "body": JSON.stringify({
                    request_token: props.request_token,
                })
            }).then(response => response.json())
            .then(data => setAllUser(data))
    }, [])

    const handleSelectedSubjectChange = (event) => {
        setSelectedSubjectId(event.target.value)
    }

    const handleYearChange = (value) => {
        setYear(value)
    }

    function submitTaskForm(){
        const yearInteger = parseInt(year)
        //Hier wird einmal geprüft, ob year überhaupt defined, also ausgefüllt ist. Und zum anderen, ob year Buchstaben enthält
        //(Dann ist das Feld nämlich nicht korrekt ausgefüllt)
        const isYearFieldFilledOutRight = (yearInteger && (yearInteger.toString() === year));

        if( !isYearFieldFilledOutRight || selectedSubjectId === "" ){
            alert("Nicht alle Pflichtfelder wurden korrekt ausgefüllt.");
            return;
        }

        let requestBody = {
            year: yearInteger,
            subjectId: selectedSubjectId,
            request_token: props.request_token,
        };

        fetch(SERVER + "/api/course/create", {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": JSON.stringify(requestBody)
            })


        let requestBodyUserAdd = {
            request_token: props.request_token,
            userList: props.userInCurrentCourse,
        }
        fetch(SERVER + "/api/course/user/add", {
            "method": "POST",
            "headers": {'Content-Type': 'application/json'},
            "body": JSON.stringify(requestBodyUserAdd)
        })
            alert("Kurs erstellt.");

        props.switchContent(COURSE_ADMINISTRATION_IDENTIFIER)
        }

    return (
        <View style={[generalNativeStyles.root, generalNativeStyles.fullWidth]}>
            <Text style={generalNativeStyles.siteHeading}>
                {"Kurs erstellen"}
            </Text>
        <Card containerStyle={customStyles.cardStyle}>
            <View style={[generalNativeStyles.root, generalNativeStyles.fullWidth, {padding: '0%'}]}>
                <FormControl variant={"standard"} className={customClasses.formControlStyle}>
                    <InputLabel id="SubjectSelectlabel">Fach</InputLabel>
                    <Select
                        labelId="SubjectSelectLabel"
                        id="subjectSelect"
                        onChange={handleSelectedSubjectChange}
                    >
                        {subjectList.map((subject) => {
                            if(!subject.deactivated){
                                return (
                                    <MenuItem value={subject.subjectId}>{subject.subjectName}</MenuItem>
                                )
                            }
                        })}
                    </Select>
                </FormControl>
                <Input
                    id="year"
                    label="Jahr"
                    variant="filled"
                    containerStyle={{width: '30%', minWidth: 140}}
                    onChangeText={(value) => handleYearChange(value)}
                />
                <SearchListComponent
                    isTwoListComponent={true}
                    normalListHeading={"Nutzer im Kurs"}
                    normalList={props.userInCurrentCourse}
                    searchListHeading={"Alle Nutzer"}
                    searchList={allUser}
                    tableHeadWords={["Id", "Benutzername", "Vorname", "Name", "Rolle"]}
                    searchOptionArray={[{value: "loginName", displayedString: "Benutzername"}, {value: "vorname", displayedString: "Vorname"}, {value: "name", displayedString: "Nachname"}]}
                    defaultSelectedSearchOption={"loginName"}
                    componentHasFilter={true}
                    filterOptionArray={[{value: "all", displayedString: "Alle"}, {value: "student", displayedString: "Schüler"}, {value: "teacher", displayedString: "Lehrer"}, {value: "admin", displayedString: "Administrator"}]}
                    filterParameter={"rolle"}
                    componentDataRecordType={"user"}
                    dataRecordIdentifierName={"userId"}
                />
                <Button
                    title={"Kurs erstellen"}
                    buttonStyle={generalNativeStyles.button1}
                    containerStyle={{width: '70%', marginTop: '1.5%'}}
                    onPress={() => submitTaskForm()}>
                </Button>
                <CancelButton containerStyle={{width: '70%'}} />
            </View>
        </Card>
        </View>
    )
}

export default connect((state) => ({
    request_token: state.loginReducer.request_token,
    isUserBeingEdited: state.adminReducer.isUserBeingEdited,
    editedUserId: state.adminReducer.editedUserId,
    userInCurrentCourse: state.adminReducer.userInCurrentCourse,
}), {switchContent, setIsUserBeingEdited})(CreateOrEditCourseForm)