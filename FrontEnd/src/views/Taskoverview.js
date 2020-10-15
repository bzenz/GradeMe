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

function Taskoverview() {
    const classes = useStyles();
    const[taskList, setTaskList] = useState([]);
    let allTasks =
        [{id:1, title:"Klassenarbeit", description: "sehr schwer", course: "Mathe", deadline: "21.12.2020", graded: true},
            {id:1, title:"Kurvendisskusion", description: "easypeazy", course: "English", deadline: "1.1.2021", graded: false}];


    useEffect(() => {
        fetch(SERVER + "/api/task/getAll/forUser")
            .then(response => response.json())
            .then(data => setTaskList(data))
    }, [])

    const testdate = new Date(4444444).toJSON();
    console.log(testdate.substring(0,10));

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

export default connect (null)(Taskoverview)