import React from 'react';
import { connect } from 'react-redux';
import {switchContent} from "../../actions/teacherNavigationActions";

const cancelButton = (props) => {
    const message = "Wenn Sie die Bearbeitung beenden, gehen Ihre eingegebenen Daten verloren. Wenn Sie die mit der Bearbeitung fortfahren möchten, drücken Sie 'Abbrechen'. 'OK' bricht die Bearbeitung ab.";
    const onClick = () => {
        console.log("YEEET");
        if (confirm(message)) props.switchContent(props.previousContent);
    }

    return (
        <button onClick={onClick}>Abbrechen</button>
    )

}

export default connect(
    state => ({previousContent: state.teacherNavigationReducer.previousContent}),
    {switchContent}
)(cancelButton)
