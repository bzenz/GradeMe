import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {SERVER} from "../../../index";
import useStyles from "../../styles/CourseOverviewStyle";
import generalStyles from "../../styles/GeneralStyles";
import Button from "@material-ui/core/Button";
import {switchContent} from "../../actions/teacherNavigationActions";
import {setCourse, unselectCourse} from "../../actions/subjectSelectActions";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {COURSE_VIEW_IDENTIFIER} from "../general/identifiers";

function CoursesForSubject(props){

    const classes = useStyles();
    const generalStyle = generalStyles();

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

    function handleCourseSelect(courseId, courseSubjectName, courseName) {
      function showCourse() {
        props.switchContent(COURSE_VIEW_IDENTIFIER);
        props.setCourse(courseId, courseSubjectName, courseName);
      }

      return showCourse;
    }

    const courseButtons = courses.map((course) =>
      <Button className={ classes.buttonListButton } key={ course.courseId } variant="outlined" onClick={ handleCourseSelect(course.courseId, course.subjectName, course.courseName) }>
        { course.courseName }
      </Button>
    )

    return (
      <div className={ classes.root }>
        <Box p={ 4 } bgcolor="background.paper" align="center">
          <Typography className={generalStyle.siteHeading}>
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
