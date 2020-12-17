import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import Typography from "@material-ui/core/Typography";
import {SERVER} from "../../../index";
import {switchContent} from "../../actions/teacherNavigationActions";
import { TASKS_FOR_COURSE_IDENTIFIER} from "./TeacherTabs";
import Box from "@material-ui/core/Box";
import { setErrorData } from "../../actions/errorActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    paper: {
        /*backgroundColor: "#63a4ff",*/
        marginTop: '10px',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        boxShadow: '3',
        width: '50%',
    },
    button: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(1),
        align: "center",
        backgroundColor: "#63a4ff",
        boxShadow: '3',
        width: '50%',
    },
    text: {
        padding: theme.spacing(1),
        justifyContent: 'center',
        fontVariant: 'body1',

    },
    buttonText: {
        marginRight: theme.spacing(2),
    },
    textfieldPoints: {
        width: '20%',
        marginRight: theme.spacing(2),
    },
    textfieldAnnotation: {
        width: '70%',
    },
}))

function evaluateTaskPage(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [studentEvaluationDataArray, setStudentEvaluationDataArray] = useState([]);
    const [nonGradedStudents, setNonGradedStudents] = useState([]);

    const handleOpenSubmitConfirmationDialog = () => {
      setOpen(true);
    };

    const handleCloseSubmitConfirmationDialog = () => {
      setOpen(false);
    };

    const addToStudentEvaluationDataArray = (newEvaluationData) => {
      let dataArray = studentEvaluationDataArray;
      dataArray.push(newEvaluationData);
      setStudentEvaluationDataArray(dataArray);
    }

    let requestBody = JSON.stringify({
        taskId: props.taskId,
        request_token: props.request_token
    });

  try {
    useEffect(() => {
      fetch(SERVER + "/api/user/getAll/forTask",
        {
          "method": "POST",
          "headers": { 'Content-Type': 'application/json' },
          "body": requestBody
        }).then(response => response.json())
        .then(data => setStudentEvaluationDataArray(data))
    }, [])

    function handleSubmitEvaluation() {
        fetch(SERVER + "/api/evaluation/evaluateTask",
            {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": JSON.stringify({
                    taskId: props.taskId,
                    request_token: props.request_token,
                    users: studentEvaluationDataArray,
                })
            })
        alert("Bewertungen wurden übermittelt");
        props.switchContent(TASKS_FOR_COURSE_IDENTIFIER)
    }


    //Funktion wird bei jedem Change des eines InputFields aufgerufen und versucht im studentEvaluationDataArray den
    //Schülerdatensatz per ID zu finden. Gibt es diesen bereits, wird der Wert geupdated.
    // Gibt es ihn nicht, wird ein neuer Datensatz mit der userId und der grade bzw. annotation angelegt
    function handleInputFieldChange(value, userId, inputFieldType) {
      if(value !== value) {
        value = "";
      }
        let studentDataFound = false;
        studentEvaluationDataArray.forEach((studentData) => {
                if(studentData.userId === userId) {
                    studentData[inputFieldType] = value;
                    studentDataFound = true;
                }
        });
        if(!studentDataFound) {
           addToStudentEvaluationDataArray({userId, [inputFieldType]: value});
        }
    }

    /*
    Hier werden die einzenlen Studenten als Komponentenarray zusammengeebaut. Dieses Komponentenarray wird später
    in der Hauptkomponente genutzt
    */
    const studentGradePapers = studentEvaluationDataArray.map((schueler) =>{
        if(schueler.rolle !== "teacher"){
          let grade = schueler.evaluation!==0?schueler.evaluation:"";
          let annotation = schueler.annotation;

            return (
                <Paper key={schueler.userId} id={schueler.userId} className={classes.paper} variant={"outlined"}>
                    <Typography className={classes.text} variant="h5">
                        {schueler.vorname + " " + schueler.name}
                    </Typography>
                    <TextField
                        className={classes.textfieldPoints}
                        id="grade input"
                        defaultValue={grade}
                        variant={"filled"}
                        label={"Note"}
                        onChange={() => handleInputFieldChange(parseInt(event.target.value), schueler.userId, "evaluation")}
                    />
                    <TextField
                        className={classes.textfieldAnnotation}
                        id="annotation"
                        defaultValue={annotation}
                        label="Anmerkung"
                        multiline
                        rows={3}
                        variant="outlined"
                        onChange={() => handleInputFieldChange(event.target.value, schueler.userId, "annotation")}
                    />
            </Paper>
            )
        }
    },
    )

    /*
    Funktion wird aufgerufen, wenn das Bewertungsformular submitted wird. Hier wird geprüft, ob in dem Array der
    Schüler auch bei jedem Schüler eine (korrekte) Note zwischen 1 und 6 eingetragen ist. Ist garnichts eingetragen,
    ist die Note entweder 0, null oder NaN. In diesen Fällen gilt der Schüler ebenfalls als nicht bewertet und wird
    dem Array nonGradedStudentsArray hinzugefügt.
    Dieses Array wird am Ende auf die Hook nonGradedStudents gesetzt, um dieses Array beizubehalten und später
    die nicht bewerteten Schüler aufzulisten.
    */
    function checkIfAllStudentsAreFilledOut(){
      let nonGradedStudentsArray = [];
      let foundUnevaluatedStudents = false;
        studentEvaluationDataArray.forEach((student) => {
          if((student.evaluation < 1 || student.evaluation > 6) && student.rolle !== "teacher"){
            nonGradedStudentsArray.push(student);
            foundUnevaluatedStudents = true;
          }
        })

      if(foundUnevaluatedStudents){
          setNonGradedStudents(nonGradedStudentsArray);
          handleOpenSubmitConfirmationDialog();
      } else {
          handleSubmitEvaluation();
      }
    }

    return(
        <div className={classes.root} style={{width: '100%'}}>
                <Typography variant="h3" align="center" color="primary">
                    Bewertungsübersicht der Aufgabe: "{props.taskTitle}"
                </Typography>
            <Box align="center">
                {studentGradePapers}
                <Button
                    className={classes.button}
                    onClick={ checkIfAllStudentsAreFilledOut}>
                    <Typography variant={"button"} className={classes.buttonText}>
                        Bewertung bestätigen
                    </Typography>
                    <CheckRoundedIcon/>
                </Button>
            </Box>
          <Dialog
            open={open}
            onClose={handleCloseSubmitConfirmationDialog}
          >
            <DialogTitle id="submit_evaluations_dialog_title">{"Wollen sie die Bewertungen übermitteln?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="submit_evaluations__dialog_content">
                  Es wurden noch nicht alle Schüler korrekt bewertet. Bitte überprüfen sie die Noten folgender Schüler: {nonGradedStudents.map((student) => {
                  return <Typography><Box fontWeight="fontWeightBold" m={0.5}>{student.vorname + " " + student.name + "\n"}</Box></Typography>
              })}
                Wollen sie die bisherigen Bewertungen trotzdem übermitteln?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmitEvaluation} color="primary">
                Ja
              </Button>
              <Button onClick={handleCloseSubmitConfirmationDialog} color="primary" autoFocus>
                Nein
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    )
  } catch (exception) {
    props.setErrorData("Beim Darstellen der Bewertungsseite ist ein Fehler aufgetreten. Möglicherweise konnte keine Verbindung zum Server aufgebaut werden");
    console.error("Errormessage: " + exception.message + "\nStacktrace:\n" + exception.stack);
    return null;
  }
}
const mapStateToProps = state => {
    return {
        request_token: state.loginReducer.request_token,
        taskId: state.teacherNavigationReducer.taskId,
        taskTitle: state.teacherNavigationReducer.taskTitle,
    }
}

export default connect(mapStateToProps, {switchContent, setErrorData})(evaluateTaskPage)
