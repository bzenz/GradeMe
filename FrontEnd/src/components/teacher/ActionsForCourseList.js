import React from "react";
import {connect} from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import useStyles from "../../styles/NavigationStyle";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {switchContent} from "../../actions/teacherNavigationActions";

export const CREATE_NEW_TASK = "CREATE_NEW_TASK";

const useStylesCustom = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    paper: {
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
        width: '100%',
    },
    buttonText: {
        marginRight: theme.spacing(2),
    },
}))

function ActionsForCourseList(props){
    const classes = useStyles();
    const classesCustom = useStylesCustom();

    function handleCourseAction(actiontype){
        props.switchContent(actiontype);
    }
    return(
        <div>
            <Button
                className={classesCustom.button}
                onClick={() => handleCourseAction(CREATE_NEW_TASK)}>
                <AddIcon/>
                <Typography variant={"button"} className={classes.buttonText}>
                    Neue Aufgabe für diesen Kurs anlegen
                </Typography>
            </Button>
        </div>
    )
}

export default connect(null, {switchContent})(ActionsForCourseList)