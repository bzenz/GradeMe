import React, {useEffect, useState} from 'react';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import {Table} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import {SERVER} from "../../../index";
import useStyles from "../../styles/CourseOverviewStyle";
import { switchContent } from "../../actions/teacherNavigationActions";
import { setErrorData } from "../../actions/errorActions";


const useStylesCustom = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    accordion: {
        width: '100%',
        minWidth: 650,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    table: {

    }
}));

function GradesAccordions(props) {

    const [allTasksOfUser, setAllTasksOfUser] = useState([]);
    const classes = useStylesCustom();
    const classesCustom = useStyles();

    let requestBody = JSON.stringify({
      userId: props.userId,
      request_token: props.request_token
    });
  try {
    useEffect(() => {
      fetch(SERVER + "/api/evaluation/getAll/forUser",
        {
          "method": "POST",
          "headers": { 'Content-Type': 'application/json' },
          "body": requestBody
        })
        .then(response => response.json())
        .then(data => setAllTasksOfUser(data))
    }, [])

    const groupBy = key => array =>
      array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {});

    const tasksByCourse = groupBy('course')(allTasksOfUser);
    let subjects = Object.entries(tasksByCourse);

    const accordionList = subjects.map((subject) =>
      <Accordion className={ classes.accordion }>
        <AccordionSummary
          expandIcon={ <ExpandMoreIcon/> }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={ classes.heading }>
            { subject[1][0].subjectName + subject[1][0].year }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={ Paper }>
            <Table className={ classes.table } size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Note</TableCell>
                  <TableCell align="right">Anmerkung</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { subject[1].map((row) => (
                  <TableRow>
                    <TableCell align="left">{ row.evaluation }</TableCell>
                    <TableCell align="right">{ row.annotation }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>
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
            <Box className={classesCustom.mainContentBox}>
                {accordionList}
            </Box>
        </div>
        )
  } catch (exeption) {
    console.error("Errormessage: " + exeption.message + "\nStacktrace:\n" + exeption.stack);
    props.setErrorData("Beim Darstellen der Notenübersicht ist ein Fehler aufgetreten. Möglicherweise konnte keine Verbindung zum Server aufgebaut werden");
    return null;
  }
}

const mapStateToProps = state => {
    return {
        userId: state.loginReducer.userId,
        request_token: state.loginReducer.request_token,
    }
}

export default connect (mapStateToProps, {switchContent, setErrorData})(GradesAccordions)