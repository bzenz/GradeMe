import React from "react";
import { View, Text } from 'react-native';
import {connect} from "react-redux";
import {generalNativeStyles} from "../../styles/GeneralStyles";

function subjectAdministration() {
    return (
        <View style={generalNativeStyles.root}>
            <Text style={generalNativeStyles.siteHeading}>
                Fächerverwaltung
            </Text>

        </View>
    )
}

export default connect()(subjectAdministration)
