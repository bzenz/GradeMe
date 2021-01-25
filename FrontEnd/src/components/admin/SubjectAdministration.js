import React from "react";
import {connect} from "react-redux";

function subjectAdministration() {
    return (
        <div>
            Fächerverwaltung
        </div>
    )
}

export default connect()(subjectAdministration)
