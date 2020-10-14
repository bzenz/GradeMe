import {INIT, RESPONSE_PARSED, LOGIN_POST_SUCCESSFULL, LOGIN_POST_FAILED} from "../actions/loginActions";
import { SERVER } from "../../index";
import {loginPostFailed, loginPostSuccessfull, responseParsed} from "../actions/loginActions";
import { loop, Cmd } from 'redux-loop';

//FUNKTIONEN
function postLoginAttempt(username, password){
    let formData = JSON.stringify({userId: username, password});
    return fetch(
        SERVER+"/api/auth/login",
        {method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: formData})
}

function parseResponseToJson(res){
    return res.json();
}

//DEFAULT STATE
const DEFAULT_STATE = {
    loggedIn: false,
    userId: undefined,
    role: undefined,
    attemptingLogin: false
}

//REDUCER
export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case INIT:
            return loop(
                {...state, attemptingLogin: true},
                Cmd.run(postLoginAttempt, {
                    failActionCreator: loginPostFailed,
                    successActionCreator: loginPostSuccessfull,
                    args: [action.username, action.password]
                })
            );
        case LOGIN_POST_SUCCESSFULL:
            if (action.res.status !== 200){
                alert("Falsche Anmeldedaten");
                return{...state, attemptingLogin: false};
            }
            return loop(
                {...state},
                Cmd.run(parseResponseToJson,{
                    successActionCreator: responseParsed,
                    args: [action.res]
                })
            );
        case RESPONSE_PARSED:
            return {...state, userId: action.res.userId, role: action.res.rolle, loggedIn: true, attemptingLogin: false, request_token: action.res.request_token};
        case LOGIN_POST_FAILED:
            alert("Netzwerkfehler");
            return{...state, attemptingLogin: false}
        default:
            return state;
    }
}


