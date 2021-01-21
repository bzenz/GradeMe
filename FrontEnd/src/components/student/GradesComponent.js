import React, {useEffect, useState} from 'react';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import {createMuiTheme, responsiveFontSizes, Table} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import {SERVER} from "../../../index";
import useStyles from "../../styles/CourseOverviewStyle";
import generalStyles from "../../styles/GeneralStyles";
import { switchContent } from "../../actions/teacherNavigationActions";
import { setErrorData } from "../../actions/errorActions";
import DescriptionIcon from '@material-ui/icons/Description';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";


const useStylesCustom = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    accordion: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    tableCell: {
        flexBasis: '30%',
        padding: '0px',
        [theme.breakpoints.only("xs")]: {
            flexBasis: '20%'
        }
    },
    tableCellTitle: {
        flexBasis: '40%',
        padding: '0px',
        [theme.breakpoints.only("xs")]: {
            flexBasis: '60%'
        }
    },
    tableFlexRow: {
        display: "flex",
    }
}));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function GradesAccordions(props) {

    const [allTasksOfUser, setAllTasksOfUser] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [currentAnnotation, setCurrentAnnotation] = React.useState("");
    const classes = useStylesCustom();
    const classesCustom = useStyles();
    const generalStyle = generalStyles();

    let requestBody = JSON.stringify({
      userId: props.userId,
      request_token: props.request_token
    });

    const showAnnotationOfGrade = (annotation) => {
        setOpen(true);
        setCurrentAnnotation(annotation);
    }

    const hideAnnotationOfGrade = () => {
        setOpen(false);
    }

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

    const tasksByCourse = groupBy('courseId')(allTasksOfUser);
    let subjects = Object.entries(tasksByCourse);

    const accordionList = subjects.map((subject) =>
      <Accordion className={ classes.accordion }>
        <AccordionSummary
          expandIcon={ <ExpandMoreIcon/> }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={ classes.heading }>
            { subject[1][0].courseName }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Table size={"medium"} >
              <TableHead>
                <TableRow className={classes.tableFlexRow}>
                  <TableCell className={classes.tableCellTitle} align="left" >Aufgabe</TableCell>
                  <TableCell className={classes.tableCell} align="center" >Note</TableCell>
                  <TableCell className={classes.tableCell} align="center">Anmerkung</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { subject[1].map((row) => (
                  <TableRow className={classes.tableFlexRow} >
                    <TableCell className={classes.tableCellTitle} >{ row.taskTitle }</TableCell>
                    <TableCell className={classes.tableCell} align="center">{ row.evaluation }</TableCell>
                      {row.annotation?
                          <TableCell className={classes.tableCell} align="center">
                              <Button
                                  title={"Anmerkung ansehen"}
                                  align="right"
                                  onClick={() => showAnnotationOfGrade(row.annotation)}
                              >
                                  <DescriptionIcon/>
                              </Button>
                          </TableCell>:
                          <TableCell className={classes.tableCell} align="center">
                              <Button align="right" disabled={true}>
                              </Button>
                          </TableCell>
                      }
                  </TableRow>
                )) }
              </TableBody>
            </Table>
        </AccordionDetails>
      </Accordion>
    )
    return(
        <div>
            <Box p={4} bgcolor="background.paper" align="center">
                <Typography className={generalStyle.siteHeading}>
                    Notenübersicht
                </Typography>
            </Box>
            <Box className={classesCustom.mainContentBox}>
                {accordionList}
            </Box>
            <Dialog
                open={open}
                onClose={hideAnnotationOfGrade}
            >
                <DialogTitle id="submit_evaluations_dialog_title">{"Anmerkung"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="submit_evaluations__dialog_content">
                        {currentAnnotation}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideAnnotationOfGrade} color="primary">
                        Schließen
                    </Button>
                </DialogActions>
            </Dialog>
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
