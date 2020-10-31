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
import {TASK_OVERVIEW_IDENTIFIER} from "./TeacherTabs";

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
    const[studentsOfTask, setStudentsOfTask] = useState([]);
    let requestBody = JSON.stringify({
        taskId: props.taskId,
        request_token: props.request_token
    });

    useEffect(() => {
        fetch(SERVER + "/api/user/getAll/forTask",
            {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": requestBody
            }).then(response => response.json())
            .then(data => setStudentsOfTask(data))
    }, [])

    function handleSumbitEvaluation() {
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
        props.switchContent(TASK_OVERVIEW_IDENTIFIER)
    }

    let studentEvaluationDataArray = [];

    function handleInputFieldChange(event, userId, inputFieldType, parseToInt=false) {
        const value = event.target.value;
        let studentDataFound = false;
        studentEvaluationDataArray.forEach((studentData) => {
            try {
                if(studentData.userId === userId) {
                    studentData[inputFieldType] = parseToInt ? parseInt(value) : value;
                    studentDataFound = true;
                }
            }
            catch (err) 
            {
                alert(err.message);
            }
        });
        if(!studentDataFound) {
            studentEvaluationDataArray.push({userId, [inputFieldType]: value});
        }
    }

    //Funktion wird bei jedem Change des GradeInputField aufgerufen und versucht im studentEvaluationDataArray den
    //Schülerdatensatz per ID zu finden. Gibt es diesen bereits, wird der Wert geupdated.
    // Gibt es ihn nicht, wird ein neuer Datensatz mit der userId und der grade angelegt
     function handleGradeInputFieldChange(event, userId, )  {
        handleInputFieldChange(event, userId, "grade", true);
    }

    //Gleiche Funtkionalität wie die handleGradeInputFieldChagne function, nur mit annotation diesmal.
    // Es ist also egal, womit man anfängt beim Eintragen
    function handleAnnotationInputFieldChange(event, userId) {
        handleInputFieldChange(event, userId, "annotation");
    }

    const studentGradePapers = studentsOfTask.map((schueler) =>
        <Paper id={schueler.userId} className={classes.paper} variant={"outlined"}>
            <Typography className={classes.text} variant="h5">
                {schueler.vorname + " " + schueler.name}
            </Typography>
            <TextField
                className={classes.textfieldPoints}
                id="grade input"
                variant={"filled"}
                label={"Note"}
                onChange={(e) => handleGradeInputFieldChange(e, schueler.userId)}
            />
            <TextField
                className={classes.textfieldAnnotation}
                id="annotation"
                label="Anmerkung"
                multiline
                rows={3}
                variant="outlined"
                onChange={(e) => handleAnnotationInputFieldChange(e, schueler.userId)}
            />
        </Paper>
    )

    return(
        <div className={classes.root} style={{width: '100%'}}>
                <Typography variant={'h4'}>
                    Bewertungsübersicht der Aufgabe: "{props.taskTitle}"
                </Typography>
            {studentGradePapers}
            <Button
                className={classes.button}
                onClick={() => handleSumbitEvaluation()}>
                <Typography variant={"button"} className={classes.buttonText}>
                    Bewertung bestätigen
                </Typography>
                <CheckRoundedIcon/>
            </Button>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        request_token: state.loginReducer.request_token,
        taskId: state.teacherNavigationReducer.taskId,
        taskTitle: state.teacherNavigationReducer.taskTitle,
    }
}

export default connect(mapStateToProps, {switchContent})(evaluateTaskPage)
