import React, {useEffect} from "react";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

    },
    paper: {
        backgroundColor: "#b3e5fc",
        marginTop: '10px',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        justifyContent: 'center',
        boxShadow: '3',
    },
    button: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(1),
        align: "center",
        backgroundColor: "#0077c2",
        boxShadow: '3',
    },
    text: {
        padding: theme.spacing(1),
        justifyContent: 'center',

    },
    buttonText: {
        marginRight: theme.spacing(2),
    },
    textfield: {
        justifyContent: 'center',
    }
}))

function evaluateTaskPage(props) {
    const classes = useStyles();
    const schuelerListe = ["Anna Heilig", "Robin Höntschdadsciue wqgcgqwjcbhweiuoz gcosldbcozqwruc", "Vorname Nachname"];

 /*   useEffect(() => {
        fetch()
    })*/
    //getAllSTudentsWithTaskId
    const studentGradePapers = schuelerListe.map((schueler) =>
        <Paper id={schueler} className={classes.paper} >
            <Typography className={classes.text} variant="h5">
                {schueler}
            </Typography>
            <TextField id="grade input" variant={"outlined"} >
            </TextField>
        </Paper>
    )

    return(
        <div className={classes.root} style={{width: '100%'}}>

                <Typography display={"flex"} p={1} variant={"h4"}>
                    Bewertungsübersicht der Aufgabe: "{props.taskTitle}"
                </Typography>

            {studentGradePapers}
            <Button className={classes.button} onClick={() => alert("Aufgabe bewertet")}>
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
        userId: state.loginReducer.userId,
        request_token: state.loginReducer.request_token,
        taskTitle: state.teacherNavigationReducer.taskTitle,
    }
}


export default connect(mapStateToProps)(evaluateTaskPage)
