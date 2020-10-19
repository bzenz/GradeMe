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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    accordion: {
      width: '100%',
      minWidth: 650,
    },
    accordionPrimaryHeading: {
        width: '100%',
    },
    accordionSecondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        width: '100%',
    },
    table: {
        minWidth: 650,
    }
}));

function Taskoverview(props) {
    const classes = useStyles();
    const[taskList, setTaskList] = useState([]);

    let requestBody = JSON.stringify({
        userId: props.userId,
        request_token: props.request_token
    });

    useEffect(() => {
        fetch(SERVER + "/api/task/getAll/forUser",
            {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": requestBody
            })
            .then(response => response.json())
            .then(data => setTaskList(data))
    }, [])

    const taskAccordionsList = taskList.map((task) =>
        <Accordion className={classes.accordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.accordionPrimaryHeading}>{task.title}</Typography>
                <Typography className={classes.accordionSecondaryHeading}>{task.course}</Typography>
                <Typography className={classes.accordionSecondaryHeading}>{task.deadline.substr(0, 10)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {task.description}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )

    return(
        <div>
            <Box p={4} bgcolor="background.paper" align="center">
                <Typography variant="h3" align="center" color="primary">
                    Aufgabenübersicht
                </Typography>
            </Box>
            {taskAccordionsList}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.loginReducer.userId,
        request_token: state.loginReducer.request_token,
    }
}

export default connect (mapStateToProps)(Taskoverview)