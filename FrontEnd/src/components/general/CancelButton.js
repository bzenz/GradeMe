import React from 'react';
import { connect } from 'react-redux';
import {switchContent} from "../../actions/teacherNavigationActions";
import {Button} from 'react-native-elements';
import { generalNativeStyles } from "../../styles/GeneralStyles";
import {setIsUserBeingEdited} from "../../actions/adminActions";

const cancelButton = (props) => {
    const message = "Sind sie sicher, dass sie die Bearbeitung abbrechen wollen? Alle eingegebenen Daten gehen dabei verloren.";
    const onClick = () => {
        if (confirm(message)) props.switchContent(props.previousContent);
        props.setIsUserBeingEdited(false);
    }

    let gns = generalNativeStyles;
    const defaultStyle = [gns.button1, gns.withMarginTop];
    let myStyle = defaultStyle.concat(props.style);
    return (
        <Button buttonStyle={myStyle}
                onPress={onClick}
                title={"Abbrechen"}/>
    )

}

export default connect(
    state => ({previousContent: state.teacherNavigationReducer.previousContent}),
    {switchContent, setIsUserBeingEdited}
)(cancelButton)
