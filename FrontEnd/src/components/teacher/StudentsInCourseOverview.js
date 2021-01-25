import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SERVER } from "../../../index";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import generalStyles from "../../styles/GeneralStyles";

const useStylesCustom = makeStyles(() => ({
  root: {
    width: '100%',
  },
 paper: {
    width: '50%',
   boxShadow: 3,
   marginTop: '1%',
   padding: '1%',
 },
}));

function StudentsInCourseOverview(props) {
  const customClasses = useStylesCustom();
    const generalStyle = generalStyles();
    const [studentList, setStudentList] = useState([]);
  try{
    const requestBody = JSON.stringify({
      request_token: props.request_token,
      courseId: props.courseId,
    });
    useEffect(() => {fetch(SERVER + "/api/user/getAll/forCourse",
      {
          "method": "POST",
          "headers": {'Content-Type': 'application/json'},
          "body": requestBody,
      }).then(response => response.json()).then(data => setStudentList(data))}, [])

    const studentPaperList = studentList.map((studentObject) =>
         studentObject.rolle === "student"?
           <Paper key={ studentObject.userId } className={ customClasses.paper }>
             <Typography variant={"body1"}>
               { studentObject.vorname + " " + studentObject.name }
             </Typography>
          </Paper>:null
    )

    return (
      <div>
        <Box p={4} bgcolor="background.paper" align="center">
          <Typography className={generalStyle.siteHeading}>
            Schülerliste für den Kurs "{props.courseName}"
          </Typography>
        </Box>
        { studentPaperList }
      </div>
    )
  }catch(exception){
    //props.setErrorData("Beim Darstellen der Bewertungsseite ist ein Fehler aufgetreten. Möglicherweise konnte keine Verbindung zum Server aufgebaut werden");
    console.error("Errormessage: " + exception.message + "\nStacktrace:\n" + exception.stack);
    return null;
  }

}
const mapStateToProps = state => {
  return {
    request_token: state.loginReducer.request_token,
    courseId: state.courseNavigationReducer.courseId,
    courseSubjectName: state.courseNavigationReducer.courseSubjectName,
    courseName: state.courseNavigationReducer.courseName,
  }
}
export default connect (mapStateToProps, null)(StudentsInCourseOverview)
