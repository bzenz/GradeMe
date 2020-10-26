import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import loginReducer from './src/reducers/loginReducer';
import teacherNavigationReducer from "./src/reducers/teacherNavigationReducer";
import LoginScreen from "./src/components/LoginScreen";
import {combineReducers, install } from 'redux-loop';
import LehrerNavigation from "./src/components/teacher/Navigation";
import SchuelerHauptmenue from "./src/views/Schueler_Hauptmenue";
import {set} from "react-native-reanimated";


const reducer = combineReducers({
  loginReducer,
  teacherNavigationReducer
})

const store = createStore(reducer, install());

function App(props) {
/*  constructor(props) {
    super(props);
  }*/
    const [user, setUser] = useState("");
    const [update, setUpdate] = useState(false);

    function handleUpdate() {
        setUpdate(!update);
    }
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = loggedInUser;
            setUser(foundUser);
        }
    }, []);


    const appropriateNavigation = props.role === "student" ? <SchuelerHauptmenue /> : <LehrerNavigation />;
    const loginScreenOrNavigation = props.loggedIn ? appropriateNavigation : <LoginScreen />;
    if(user) {
        return(
            <div>
                {appropriateNavigation}
            </div>
        )
    }
    return (
      <View style={styles.container}>
          <LoginScreen onSubmit={handleUpdate}>
          </LoginScreen>
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

