import React from "react";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";

const useStylesCustom = makeStyles((theme) => ({
    paper: {
        background: "yellow",
    },
}));
function SearchAndListComponent() {
    const classesCustom = useStylesCustom();
    return (
    <div>
       <Paper className={classesCustom.paper}>
           test
       </Paper>


    </div>
    )
}

export default connect ()(SearchAndListComponent)