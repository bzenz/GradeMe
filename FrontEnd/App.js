import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import loginReducer from './src/reducers/loginReducer';
import teacherNavigationReducer from "./src/reducers/teacherNavigationReducer";
import LoginScreen from "./src/components/LoginScreen";
import {combineReducers, install } from 'redux-loop';
import LehrerNavigation from "./src/components/teacher/Navigation";


const reducer = combineReducers({
  loginReducer,
  teacherNavigationReducer
})

const store = createStore(reducer, install());

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const appropriateNavigation = this.props.role === "student" ? <Text>Hallo Schüler</Text> : <LehrerNavigation />;
    const loginScreenOrNavigation = this.props.loggedIn ? appropriateNavigation : <LoginScreen />;
    return (
      <View style={styles.container}>
          {loginScreenOrNavigation}
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

