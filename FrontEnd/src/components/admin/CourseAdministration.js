import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {generalNativeStyles} from "../../styles/GeneralStyles";
import {Button, Text} from "react-native-elements";
import SearchListComponent from "../SearchListComponent";
import {View} from "react-native";
import {CREATE_OR_EDIT_COURSE_IDENTIFIER} from "../general/identifiers";
import {switchContent} from "../../actions/teacherNavigationActions";
import {setErrorData} from "../../actions/errorActions";
import {setUserInCurrentCourse} from "../../actions/adminActions";
import {SERVER} from "../../../index";

function courseAdministration(props) {
    const [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        fetch(SERVER + "/api/course/getAll",
            {
                "method": "POST",
                "headers": { 'Content-Type': 'application/json' },
                "body": JSON.stringify({
                    request_token: props.request_token,
                })
            }).then(response => response.json())
            .then(data => setAllCourses(data))
    }, [])

    const handleCreateCourseClick = () => {
        props.setUserInCurrentCourse([]);
        props.switchContent(CREATE_OR_EDIT_COURSE_IDENTIFIER);
    }

    return (
        <View id={"mainview"} style={[generalNativeStyles.root, generalNativeStyles.fullWidth]}>
            <Text style={generalNativeStyles.siteHeading}>
                Kursverwaltung
            </Text>
            <Button
                buttonStyle={generalNativeStyles.button1}
                containerStyle={{width: "70%"}}
                onPress={handleCreateCourseClick}
                title={"Kurs anlegen"}
            >
            </Button>
            <SearchListComponent
                isTwoListComponent={false}
                searchListHeading={"Kurse"}
                searchList={allCourses}
                tableHeadWords={["Id", "Fach", "Jahr", "Name"]}
                searchOptionArray={[{value: "courseId", displayedString: "Kurs-Id"}, {value: "subjectName", displayedString: "Fachname"}]}
                defaultSelectedSearchOption={"subjectName"}
                componentHasFilter={false}
                componentDataRecordType={"course"}
                dataRecordIdentifierName={"courseId"}
            />
        </View>
    )
}

export default connect((state) => ({request_token: state.loginReducer.request_token}), {switchContent, setErrorData, setUserInCurrentCourse})(courseAdministration)
