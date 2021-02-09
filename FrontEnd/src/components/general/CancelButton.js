import React from 'react';
import { connect } from 'react-redux';
import {switchContent} from "../../actions/teacherNavigationActions";
import {Button} from 'react-native-elements';
import { generalNativeStyles } from "../../styles/GeneralStyles";

const cancelButton = (props) => {
    const message = "Wenn Sie die Bearbeitung beenden, gehen Ihre eingegebenen Daten verloren. Wenn Sie die mit der Bearbeitung fortfahren möchten, drücken Sie 'Abbrechen'. 'OK' bricht die Bearbeitung ab.";
    const onClick = () => {
        if (confirm(message)) props.switchContent(props.previousContent);
    }

    let gns = generalNativeStyles;
    const defaultStyle = [gns.button1, gns.withMarginTop];
    let myStyle = defaultStyle.concat(props.style);
    return (
        <Button containerStyle={myStyle}
                onPress={onClick}
                title={"Abbrechen"}/>
    )

}

export default connect(
    state => ({previousContent: state.teacherNavigationReducer.previousContent}),
    {switchContent}
)(cancelButton)
