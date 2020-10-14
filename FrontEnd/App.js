import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import testReducer from './src/reducers/testreducer';
import SchuelerHauptmenue from "./src/views/Schueler_Hauptmenue";

let store = createStore(combineReducers({testReducer}));

class App extends React.Component {
  render() {
      return (
          <View style={styles.container}>
            <SchuelerHauptmenue />
          </View>
      )

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

