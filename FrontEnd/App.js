import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import loginReducer from './src/reducers/loginReducer';
import teacherNavigationReducer from "./src/reducers/teacherNavigationReducer";
import LoginScreen from "./src/components/LoginScreen";
import {combineReducers, install } from 'redux-loop';
import LehrerNavigation from "./src/components/teacher/Navigation";
import SchuelerHauptmenue from "./src/views/Schueler_Hauptmenue";
import subjectSelectReducer from "./src/reducers/subjectSelectReducer";
import {loadUserData} from "./src/actions/loginActions";

const reducer = combineReducers({
  loginReducer,
  teacherNavigationReducer,
  subjectSelectReducer
})

const store = createStore(reducer, install());

function App(props) {
    if(localStorage.getItem("userId") && localStorage.getItem("role") && localStorage.getItem("request_token")){
        props.loadUserData(parseInt(localStorage.getItem("userId")), localStorage.getItem("role"), localStorage.getItem("request_token"));

    }


    const appropriateNavigation = localStorage.getItem("role") === "student" ? <SchuelerHauptmenue />: <LehrerNavigation />;
    if(localStorage.getItem("userId")) {
        return(
        <View style={styles.container}>
            {appropriateNavigation}
            <StatusBar style="auto"/>
        </View>
        )
    }
    return (
      <View style={styles.loginScreen}>
          <LoginScreen />
          <StatusBar style="auto"/>
      </View>
    );

}

const ConnectedApp = connect(
    (state)=>({
      loggedIn: state.loginReducer.loggedIn,
      userId: state.loginReducer.userId,
      role: state.loginReducer.role,
      request_token: state.loginReducer.request_token,
    }),
    { loadUserData }
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
  },
    loginScreen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

