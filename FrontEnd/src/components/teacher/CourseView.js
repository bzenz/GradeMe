import {connect} from "react-redux";
import React from "react";

function CourseOverview(props){
    return(
        <div>{props.courseId}</div>
    )
}

export default connect((state)=>({courseId: state.subjectSelectReducer.courseId}))(CourseOverview)
