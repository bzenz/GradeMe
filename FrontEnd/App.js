import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import loginReducer from './src/reducers/loginReducer';
import LoginScreen from "./src/components/LoginScreen";
import {combineReducers, install } from 'redux-loop';


const reducer = combineReducers({
  loginReducer,
})

const store = createStore(reducer, install());

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("ja");
    return (
      <View style={styles.container}>
          {this.props.loggedIn ?
              <Text>{`Hallo ${this.props.userId}, willkommen in der ${this.props.role === "student" ? "Schülerübersicht" : "Lehrerübersicht"}! \n RQ-Token:${this.props.request_token}`}</Text>
              : <LoginScreen />}
          <StatusBar style="auto"/>
      </View>
    );
  };
}
const ConnectedApp = connect(
    (state)=>({
      loggedIn: state.loginReducer.loggedIn,
      userId: state.loginReducer.userId,
      role: state.loginReducer.role,
      request_token: state.loginReducer.request_token,
    }),
    null
)(App);

export default class MyApp extends React.Component {
  render(){
    return(
        <Provider store={store}>
            <ConnectedApp />
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

