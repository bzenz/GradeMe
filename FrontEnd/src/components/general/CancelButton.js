import React from 'react';
import { connect } from 'react-redux';
import {switchContent} from "../../actions/teacherNavigationActions";
import {Button} from 'react-native-elements';
import { generalNativeStyles } from "../../styles/GeneralStyles";

const cancelButton = (props) => {
    const message = "Wenn Sie die Bearbeitung beenden, gehen Ihre eingegebenen Daten verloren. \n \n Drücken sie 'Ok' um die Bearbeitung endgültig abzubrechen. \n \n Drücken sie 'abbrechen' um zurück zum Bearbeitungsformular zu gehen";
    const onClick = () => {
        if (confirm(message)) {
            props.switchContent(props.previousContent);
            //Die executeFunction ist eine Prop, in der eine Funktion übergeben werden kann, die beim abbrechen
            //ausgeführt werden soll, wie zum Beispiel den Bearbeitungsstatus eines Formulares auf false setzen
            if(props.executeFunction){
                props.executeFunction();
            }
        }
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
    {switchContent}
)(cancelButton)
