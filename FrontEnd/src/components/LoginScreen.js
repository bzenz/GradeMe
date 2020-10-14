import React from 'react';
import {KeyboardAvoidingView, TextInput, Button, Text} from "react-native";
import { connect } from 'react-redux';
import { init } from '../actions/loginActions';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handleSubmit(){
        this.props.init(this.state.username, this.state.password);
    }

    render() {
        return(
            <KeyboardAvoidingView>
                <Text>GradeMe</Text>
                <TextInput
                    placeholder = "Nutzername"
                    value = {this.state.username}
                    onChange = {this.handleUsernameChange}
                />
                <TextInput
                    placeholder = "Passwort"
                    value = {this.state.password}
                    onChange = {this.handlePasswordChange}
                    secureTextEntry
                    onSubmitEditing = {this.handleSubmit}
                />
                <Button
                    title = "Einloggen"
                    onPress = {this.handleSubmit}
                />
            </KeyboardAvoidingView>
        )
    }
}

export default connect(
    null,
    { init }
)(LoginScreen);
