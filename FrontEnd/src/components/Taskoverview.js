import React, {useEffect, useState} from 'react';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import Box from "@material-ui/core/Box";
import {SERVER} from "../../index";
import Button from "@material-ui/core/Button";
import {SHOW_EVALUATE_TASK_PAGE, showEvaluateTaskPage, switchContent} from "../actions/teacherNavigationActions";
import { setErrorData } from "../actions/errorActions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    accordion: {
      width: '100%',

    },
    accordionPrimaryHeading: {
        flexBasis: '40%',
    },
    accordionSecondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '20%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        width: '100%',
    },
    button: {
        backgroundColor: '#63a4ff',
        flexBasis: '20%'
    },
    mainContentBox: {
        paddingRight: '5%',
        paddingLeft: '5%',
    },
}));


function Taskoverview(props) {
    const classes = useStyles();
    const[taskList, setTaskList] = useState([]);

    let requestBody = JSON.stringify({
        userId: props.userId,
        request_token: props.request_token
    });

    function handleEvaluateTaskClick(taskId, taskTitle){
        props.switchContent(SHOW_EVALUATE_TASK_PAGE);
        props.showEvaluateTaskPage(taskId, taskTitle);
    }

    function getTasksForCourse(data){
        return data.filter((task)=>(task.course === props.courseId));
    }

  try {
    useEffect(() => {
      fetch(SERVER + "/api/task/getAll/forUser",
        {
          "method": "POST",
          "headers": { 'Content-Type': 'application/json' },
          "body": requestBody
        })
        .then(response => response.json())
        .then(data => props.forCourse ? setTaskList(getTasksForCourse(data)) : setTaskList(data))
    }, [])

    const taskAccordionsList = taskList.map((task) =>
        <Accordion key={task.taskId} className={classes.accordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.accordionPrimaryHeading}>{task.title}</Typography>
                <Typography className={classes.accordionSecondaryHeading}>{task.course}</Typography>
                <Typography className={classes.accordionSecondaryHeading}>{task.deadline.substr(0, 10)}</Typography>
                {props.role === "teacher" && task.graded?
                    <Button className={classes.button}
                        onClick={() => handleEvaluateTaskClick(task.taskId, task.title)}>
                        Aufgabe bewerten
                    </Button> :null}
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {task.description}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )

    return (
      <div>
        <Box p={ 4 } bgcolor="background.paper" align="center">
          <Typography variant="h3" align="center" color="primary">
            Aufgabenübersicht
          </Typography>
        </Box>
        <Box className={ classes.mainContentBox }>
        { taskAccordionsList }
        </Box>

      </div>
    )
  } catch (exception) {
      props.setErrorData("Beim Darstellen der Aufgabenübersicht ist ein Fehler aufgetreten. Möglicherweise konnte keine Verbindung zum Server aufgebaut werden");
      console.error("Errormessage: " + exception.message + "\nStacktrace:\n" + exception.stack);
      return null;
  }
}

const mapStateToProps = state => {
    return {
        userId: state.loginReducer.userId,
        request_token: state.loginReducer.request_token,
        role: state.loginReducer.role,
        courseId: state.courseNavigationReducer.courseId,
    }
}

export default connect (mapStateToProps, {showEvaluateTaskPage, switchContent, setErrorData})(Taskoverview)
