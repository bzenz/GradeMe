import {connect} from "react-redux";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import useStyles from "../../styles/CourseOverviewStyle";

function CourseOverview(props){
    const classes = useStyles();
    return(
        <div>
            <Typography variant="h3" align="center" color="primary">
                Kursdetails für Kurs "{props.courseName}"
            </Typography>
            <Paper className={classes.paper}>
                <Typography variant="body1">
                    Fach: {props.courseSubjectName}
                </Typography>
            </Paper>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        courseId: state.courseNavigationReducer.courseId,
        courseName: state.courseNavigationReducer.courseName,
        courseSubjectName: state.courseNavigationReducer.courseSubjectName,
    }
}

export default connect(mapStateToProps, null)(CourseOverview)
