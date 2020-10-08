import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import testReducer from './src/reducers/testreducer';
//import  { Schuelersicht }  from './src/views/Studentenview.js';
import  Schuelersicht  from './src/views/Schuelersicht.js';

let store = createStore(combineReducers({testReducer}));

class App extends React.Component {
  render() {
    if(false) {
        return (
            <View style={styles.container}>
              <Text>schueler</Text>
              <StatusBar style="auto"/>
            </View>
        );
    } else if(true) {
        return (
            <View>
                <Schuelersicht />
            </View>
        )
    } else {
        <View>
            <Text> Login </Text>
        </View>
    }



  };
}

export default class MyApp extends React.Component {
  render(){
    return(
        <Provider store={store}>
           <App />
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

