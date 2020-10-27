import React, {useEffect, useState} from "react";
import {SERVER} from "../../../index";
import { connect } from "react-redux";
import useStyles from "./CourseOverviewStyle";
import Button from "@material-ui/core/Button";
import {setSubject} from "../../actions/subjectSelectActions";
import {switchContent} from "../../actions/teacherNavigationActions";
import {COURSES_FOR_SUBJECT_IDENTIFIER} from "./TeacherTabs";

function SubjectOverview(props) {

    const classes = useStyles();
    const[subjectsOfTeacher, setSubjectsOfTeacher] = useState([]);
    const requestBody = JSON.stringify({
        userId: props.userId,
        request_token: props.request_token
    });

    function getSubjects(courses){
        let subjects = [];
        courses.reduce((e1, e2) => {e1.subjectName !== e2.subjectName && subjects.push({name: e2.subjectName, id: e2.subjectId}); return e2}, {subjectName: null});
        return subjects;
    }

    useEffect(()=>{
        fetch(SERVER+"/api/course/getAll/forUser",
            {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": requestBody
            }).then(response => response.json())
        .then(data => {
            setSubjectsOfTeacher(getSubjects(data));
        })
    }, [])

    function handleSubjectSelect(subject) {
        function showSubject(){
            props.setSubject(subject);
            props.switchContent(COURSES_FOR_SUBJECT_IDENTIFIER);
            console.log(props.state);
        }
        return showSubject;
    }

    const coursePapers =subjectsOfTeacher.map((subject)=>
            <Button className={classes.text} key={subject.id} variant="outlined" onClick={handleSubjectSelect(subject.id)}>
                {subject.name}
            </Button>
    )
    return(
        <div className={classes.root}>
            {coursePapers}
        </div>
    )
}

export default connect(
    (state)=>({
        state,
        userId: state.loginReducer.userId,
        request_token: state.loginReducer.request_token,
        content: state.teacherNavigationReducer.activeContent
    }),
    {setSubject, switchContent})
(SubjectOverview);
