import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {SERVER} from "../../../index";
import useStyles from "./CourseOverviewStyle";
import Button from "@material-ui/core/Button";
import {switchContent} from "../../actions/teacherNavigationActions";
import {setCourse, unselectCourse} from "../../actions/subjectSelectActions";
import {COURSE_VIEW_IDENTIFIER} from "./TeacherTabs";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

  try{
    useEffect(() => {
      props.unselectCourse();
      fetch(SERVER + "/api/course/getAll/forUser",
        {
          "method": "POST",
          "headers": { 'Content-Type': 'application/json' },
          "body": requestBody
        }).then(response => response.json())
        .then(data => {
          setCourses(getCoursesForSubject(data));
        })
    }, []);

    function handleCourseSelect(courseId, courseYear, courseSubjectName) {
      function showCourse() {
        props.switchContent(COURSE_VIEW_IDENTIFIER);
        props.setCourse(courseId, courseYear, courseSubjectName);
      }

      return showCourse;
    }

    const courseButtons = courses.map((course) =>
      <Button className={ classes.text } key={ course.courseId } variant="outlined" onClick={ handleCourseSelect(course.courseId, course.year, course.subjectName) }>
        { course.subjectName + course.year }
      </Button>
    )

    return (
      <div className={ classes.root }>
        <Box p={ 4 } bgcolor="background.paper" align="center">
          <Typography variant="h3" align="center" color="primary">
            Kurse für Fach "{ props.subjectName }"
          </Typography>
        </Box>
        <Box className={ classes.mainContentBox }>
          { courseButtons }
        </Box>

      </div>
    )
  } catch(exception){
    props.setErrorData("Beim Darstellen der Kursübersicht für dieses Fach ist ein Fehler aufgetreten. Möglicherweise konnte keine Verbindung zum Server aufgebaut werden");
    console.error("Errormessage: " + exception.message + "\nStacktrace:\n" + exception.stack);
    return null;
  }
}

export default connect(
    (state)=>({
        subjectId: state.courseNavigationReducer.subjectId,
        subjectName : state.courseNavigationReducer.subjectName,
        userId: state.loginReducer.userId,
        request_token: state.loginReducer.request_token
    }),
    {switchContent, setCourse, unselectCourse})
(CoursesForSubject);
