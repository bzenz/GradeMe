import {connect} from "react-redux";
import React from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
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
    const classes = useStyles();
    let requestBody = {
        title: "",
        description: "",
        course: props.courseId,
        graded: false,
        deadline: "00-00-0000",
        request_token: props.request_token,
    };

    function handleFormChange(event, type) {
        if(type === "graded") {
            requestBody[type] = event.target.checked;
            return;
        }
        requestBody[type] = event.target.value;
    }

    function submitTaskForm(){
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
            <Typography className={classes.heading4} variant={'h4'}>
                Aufgabe erstellen
            </Typography>
            <Paper className={classes.root}>
                <TextField
                    id={'title'}
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
