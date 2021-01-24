import {AsyncStorage} from 'react-native';

let getItem = (key) => {
    let returnVal;
    AsyncStorage.getItem(key, (variableToCatchANullValueGivenToTheCallbackForUnknownReasons, result) => {returnVal = result});
    return returnVal;
}

let setItem = (key, value) => {
    AsyncStorage.setItem(key, value, error => console.log(error));
}

let removeItem = (key) => {
    AsyncStorage.removeItem(key, error => console.log(error));
}

let localStorage = {getItem, setItem, removeItem};

export default localStorage;
