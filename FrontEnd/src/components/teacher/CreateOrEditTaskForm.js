import {connect} from "react-redux";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {SERVER} from "../../../index";
import { setIsTaskBeingEdited, switchContent } from "../../actions/teacherNavigationActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

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

function CreateOrEditTaskForm(props){
  const [titleFieldFilled, setTitleFieldFilled] = useState(true);
  const [deadlineFieldFilled, setDeadlineFieldFilled] = useState(true);
  const [title, setTitle] = useState(props.isTaskBeingEdited?props.taskOriginalTitle:"");
  const [graded, setGraded] = useState(props.isTaskBeingEdited?props.isTaskOriginallyGraded:false);
  const [deadline, setDeadline] = useState(props.isTaskBeingEdited?props.taskOriginalDeadline:"00-00-0000");
  const [description, setDescription] = useState(props.isTaskBeingEdited?props.taskOriginalDescription:"");
  const [isWarningDialogOpen, setIsWarningDialogOpen] = useState(false);
  const classes = useStyles();

  const handleWarningDialogClose = () => {
      setIsWarningDialogOpen(false);
  }
    function handleFormChange(event, type) {
      switch (type) {
        case "title": setTitle(event.target.value); break;
        case "graded": {
            let checkBoxValue = event.target.checked;
            if(!checkBoxValue){
                setIsWarningDialogOpen(true);
            }
            setGraded(checkBoxValue);
        } break;
        case "deadline": setDeadline(event.target.value); break;
        case "description": setDescription(event.target.value);
        }
    }

    function submitTaskForm() {
      let isTitleFieldFilled = (title !== "");
      let isDeadlineFieldFilled = (deadline !== "00-00-0000" && deadline !== "");
      setTitleFieldFilled(isTitleFieldFilled);
      setDeadlineFieldFilled(isDeadlineFieldFilled)

      /* Der Grund dafür, dass hier der Wert der Variablen "isTitleFieldFilled" bzw. "isDeadlineFieldFilled"
         abgefragt wird, ist dass Hooks zu setzen eine ansyncrone Funktion ist. D.h. ich kann nicht den Ausdruck
         (title !== "") bzw. (deadline !== "00-00-0000" && deadline !== "") auswerten, ihn als Hook setzen und direkt danach
         die Hook abfragen, da sich die Hook noch nicht aktualisiert hat.
         Deshalb muss man hier leider sowohl Hooks als auch normale Variablen nutzen*/
      if (!isTitleFieldFilled || !isDeadlineFieldFilled) {
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

      if(props.isTaskBeingEdited){
        requestBody = {
          taskId: props.taskId,
          title: title,
          description: description,
          course: props.courseIdEditedTask,
          graded: graded,
          deadline: deadline,
          request_token: props.request_token,
        };
        fetch(SERVER + "/api/task/edit", {
          "method": "POST",
          "headers": { 'Content-Type': 'application/json' },
          "body": JSON.stringify(requestBody)
        })
        alert("Aufgabe wurde bearbeitet");
        props.setIsTaskBeingEdited(false);
      } else {
          fetch(SERVER + "/api/task/create", {
            "method": "POST",
            "headers": { 'Content-Type': 'application/json' },
            "body": JSON.stringify(requestBody)
          })
          alert("Aufgabe wurde erstellt");
      }
      props.switchContent(props.previousContent)
    }

    return(
        <div className={classes.root}>
            <Typography className={classes.heading4} variant={'h4'}>
              {props.isTaskBeingEdited?"Aufgabe bearbeiten":"Aufgabe erstellen"}
            </Typography>
            <Paper className={classes.root}>
                <TextField
                    id={'title'}
                    defaultValue={props.isTaskBeingEdited?props.taskOriginalTitle:null}
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
                            defaultChecked={props.isTaskBeingEdited?props.isTaskOriginallyGraded:null}
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
                        defaultValue= {props.isTaskBeingEdited?props.taskOriginalDeadline:null}
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
                    defaultValue={props.isTaskBeingEdited?props.taskOriginalDescription:null}
                    multiline
                    rows={3}
                    variant="outlined"
                    onChange={(e) => {handleFormChange(e, "description")}}
                />
                <IconButton color={'primary'} onClick={() => submitTaskForm()}>
                    <NoteAddIcon className={classes.createIcon} />
                  {props.isTaskBeingEdited?"Veränderte Aufgabendetails absenden":"Aufgabe erstellen"}
                </IconButton>
            </Paper>
            <Dialog
                open={isWarningDialogOpen}
                onClose={handleWarningDialogClose}

            >
                <DialogTitle id="warning-dialog-title">{"Warnung"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="warning-dialog-description">
                        Wenn sie diese Aufgabe als unbewertet markieren, werden alle bisher gespeicherten Noten dieser Aufgabe
                        für die Schüler unsichtbar. Die bisher gespeicherten Noten gehen jedoch nicht verloren.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleWarningDialogClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      request_token: state.loginReducer.request_token,
      courseId: state.courseNavigationReducer.courseId,
      courseIdEditedTask: state.teacherNavigationReducer.taskCourseId,
      taskOriginalTitle: state.teacherNavigationReducer.taskTitle,
      isTaskOriginallyGraded: state.teacherNavigationReducer.taskGraded,
      taskOriginalDeadline: state.teacherNavigationReducer.taskDeadline,
      taskOriginalDescription: state.teacherNavigationReducer.taskDescription,
      isTaskBeingEdited: state.teacherNavigationReducer.isTaskBeingEdited,
      taskId: state.teacherNavigationReducer.taskId,
      previousContent: state.teacherNavigationReducer.previousContent,
    }
}

export default connect (mapStateToProps, {switchContent, setIsTaskBeingEdited: setIsTaskBeingEdited})(CreateOrEditTaskForm)
