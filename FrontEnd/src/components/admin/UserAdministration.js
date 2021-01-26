import React from "react";
import {connect} from "react-redux";

function userAdministration() {
    return (
        <div>
            Nutzerverwaltung
        </div>
    )
}

export default connect()(userAdministration)
