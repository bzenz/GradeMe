import React from "react";
import {connect} from "react-redux";

function courseAdministration() {
    return (
        <div>
            Kursverwaltung
        </div>
    )
}

export default connect()(courseAdministration)
