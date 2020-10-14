import React from 'react';
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
    accordionPrimaryHeading: {
        width: '100%',
    },
    accordionSecondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    table: {
        minWidth: 650,
    }
}));

function Taskoverview() {
    const classes = useStyles();
    let allTasks =
        [{id:1, title:"Klassenarbeit", description: "sehr schwer", course: "Mathe", deadline: "21.12.2020", graded: true},
            {id:1, title:"Kurvendisskusion", description: "easypeazy", course: "English", deadline: "1.1.2021", graded: false}];

    const taskList = allTasks.map((task) =>
        <Accordion className={classes.accordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.accordionPrimaryHeading}>{task.title}</Typography>
                <Typography className={classes.accordionSecondaryHeading}>{task.course}</Typography>
                <Typography className={classes.accordionSecondaryHeading}>{task.deadline}</Typography>
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
                    Notenübersicht
                </Typography>
            </Box>
            {taskList}
        </div>
    )
}

export default connect (null)(Taskoverview)