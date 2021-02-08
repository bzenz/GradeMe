import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1%",
  },
  paper: {
    width: '100%',
    boxShadow: 3,
    backgroundColor: "primary",
    padding: "3%",
    justifySelf: "center",
  },
}));


export default function ErrorContentPaper(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant={"h6"}>
          Entschuldigung, leider ist etwas schiefgelaufen. Dieser Inhalt steht momentan nicht zur Verfügung. Versuchen sie sich erneut einzuloggen oder
          wenden sie sich an den Administrator von GradeMe. <br/> Fehler: {props.errorMessageToUser}
        </Typography>
      </Paper>
    </div>
  )
}

