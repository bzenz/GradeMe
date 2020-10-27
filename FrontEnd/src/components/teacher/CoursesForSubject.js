import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {SERVER} from "../../../index";
import useStyles from "./CourseOverviewStyle";
import Button from "@material-ui/core/Button";
import {switchContent} from "../../actions/teacherNavigationActions";
import {setCourse} from "../../actions/subjectSelectActions";
import {COURSE_VIEW_IDENTIFIER} from "./TeacherTabs";

function CoursesForSubject(props){

    const classes = useStyles();
    const[courses, setCourses] = useState([]);

    function getCoursesForSubject(data){
        return data.filter((course)=>(course.subjectId === props.subjectId))
    }

    const requestBody = JSON.stringify({
        userId: props.userId,
        request_token: props.request_token
    });

    useEffect(()=>{
        fetch(SERVER+"/api/course/getAll/forUser",
            {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": requestBody
            }).then(response => response.json())
            .then(data => {
                setCourses(getCoursesForSubject(data));
            })
    }, []);

    function handleCourseSelect(courseId){
        function showCourse(){
            props.switchContent(COURSE_VIEW_IDENTIFIER);
            props.setCourse(courseId);
        }
        return showCourse;
    }

    const courseButtons =courses.map((course)=>
        <Button className={classes.text} key={course.courseId} variant="outlined" onClick={handleCourseSelect(course.courseId)}>
            {course.courseId}
        </Button>
    )

    return(
        <div>
            <div>{props.subject}</div>
            {courseButtons}
        </div>
    )
}

export default connect(
    (state)=>({
        subjectId: state.subjectSelectReducer.subjectId,
        userId: state.loginReducer.userId,
        request_token: state.loginReducer.request_token
    }),
    {switchContent, setCourse})
(CoursesForSubject);
