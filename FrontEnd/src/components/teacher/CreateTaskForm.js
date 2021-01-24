import {connect} from "react-redux";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import generalStyles from "../../styles/GeneralStyles";
import {Typography} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {SERVER} from "../../../index";
import {COURSE_VIEW_IDENTIFIER} from "./TeacherTabs";
import {switchContent} from "../../actions/teacherNavigationActions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '1%',
    },
    heading4: {
        margin: '8px',
    },
    textfield: {
        width: '100%',
        marginTop: '1%',
    },
    createIcon: {
        marginRight: '10px',
    }
}))

function CreateTaskForm(props){
  const [titleFieldFilled, setTitleFieldFilled] = useState(true);
  const [deadlineFieldFilled, setDeadlineFieldFilled] = useState(true);
  const [title, setTitle] = useState("");
  const [graded, setGraded] = useState(false);
  const [deadline, setDeadline] = useState("00-00-0000");
  const [description, setDescription] = useState("");
  const classes = useStyles();
  const generalStyle = generalStyles();

    function handleFormChange(event, type) {
      switch (type) {
        case "title": setTitle(event.target.value); break;
        case "graded": setGraded(event.target.checked); break;
        case "deadline": setDeadline(event.target.value); break;
        case "description": setDescription(event.target.value);
        }
    }

    function submitTaskForm(){
      let isTitleFieldFilled = (title !== "");
      let isDeadlineFieldFilled = (deadline !== "00-00-0000" && deadline !== "");
      setTitleFieldFilled(isTitleFieldFilled);
      setDeadlineFieldFilled(isDeadlineFieldFilled)

   /* Der Grund dafür, dass hier der Wert der Variablen "isTitleFieldFilled" bzw. "isDeadlineFieldFilled"
      abgefragt wird, ist dass Hooks zu setzen eine ansyncrone Funktion ist. D.h. ich kann nicht den Ausdruck
      (title !== "") bzw. (deadline !== "00-00-0000" && deadline !== "") auswerten, ihn als Hook setzen und direkt danach
      die Hook abfragen, da sich die Hook noch nicht aktualisiert hat.
      Deshalb muss man hier leider sowohl Hooks als auch normale Variablen nutzen*/
      if(!isTitleFieldFilled || !isDeadlineFieldFilled){
        alert("Nicht alle Pflichtfelder wurden ausgefüllt.");
        return;
      }

      let requestBody = {
        title: title,
        description: description,
        course: props.courseId,
        graded: graded,
        deadline: deadline,
        request_token: props.request_token,
      };
        fetch(SERVER + "/api/task/create", {
            "method": "POST",
            "headers": {'Content-Type': 'application/json'},
            "body": JSON.stringify(requestBody)
        })
        alert("Aufgabe wurde erstellt");
        props.switchContent(COURSE_VIEW_IDENTIFIER)
    }

    return(
        <div className={classes.root}>
            <Typography className={generalStyle.siteHeading} >
                Aufgabe erstellen
            </Typography>
            <Paper className={classes.root}>
                <TextField
                    id={'title'}
                    error ={ !titleFieldFilled }
                    helperText={"Pflichtfeld"}
                    className={classes.textfield}
                    variant={'outlined'}
                    label={'Titel'}
                    onChange={(e) => {handleFormChange(e, "title")}}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="graded"
                            color="primary"
                            onChange={(e) => {handleFormChange(e, "graded")}}
                        />
                    }
                    label="Benotet"
                />
                <form className={classes.container} noValidate>
                    <TextField
                        id="taskDeadline"
                        error = { !deadlineFieldFilled }
                        helperText={"Pflichtfeld"}
                        label="Abgabedatum"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => {handleFormChange(e, "deadline")}}
                    />
                </form>
                <TextField
                    className={classes.textfield}
                    id="description"
                    label="Beschreibung"
                    multiline
                    rows={3}
                    variant="outlined"
                    onChange={(e) => {handleFormChange(e, "description")}}
                />
                <IconButton color={'primary'} onClick={() => submitTaskForm()}>
                    <NoteAddIcon className={classes.createIcon} />
                    Aufgabe erstellen
                </IconButton>
            </Paper>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        request_token: state.loginReducer.request_token,
        courseId: state.courseNavigationReducer.courseId,
    }
}

export default connect (mapStateToProps, {switchContent})(CreateTaskForm)
