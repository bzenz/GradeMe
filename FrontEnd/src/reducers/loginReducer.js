import {
    INIT,
    RESPONSE_PARSED,
    LOGIN_POST_SUCCESSFULL,
    LOGIN_POST_FAILED,
    LOAD_USER_DATA, LOGOUT_ACTION, SET_SCREEN_WIDTH_IS_MOBILE
} from "../actions/loginActions";
import { SERVER } from "../../index";
import {loginPostFailed, loginPostSuccessfull, responseParsed} from "../actions/loginActions";
import { loop, Cmd } from 'redux-loop';
import {switchContent} from "../actions/teacherNavigationActions";
import localStorage from "../../utils/localStorageMock";
import {GRADES_OVERVIEW_IDENTIFIER, SUBJECT_OVERVIEW_IDENTIFIER, USER_ADMINISTRATION_IDENTIFIER} from "../components/general/identifiers";

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

function getDefaultContentForRole(role){
    switch (role){
        case "student": return GRADES_OVERVIEW_IDENTIFIER;
        case "teacher": return SUBJECT_OVERVIEW_IDENTIFIER;
        case "admin": return USER_ADMINISTRATION_IDENTIFIER;
    }
}

//DEFAULT STATE
const DEFAULT_STATE = {
    loggedIn: false,
    userId: undefined,
    role: undefined,
    attemptingLogin: false,
    isScreenWidthMobile: false,
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
        case RESPONSE_PARSED: {
            let userId = parseInt(action.res.userId);
            localStorage.setItem('userId', userId);
            localStorage.setItem('role', action.res.rolle);
            localStorage.setItem('request_token', action.res.request_token);
            return loop({...state, userId, role: action.res.rolle, loggedIn: true, attemptingLogin: false, request_token: action.res.request_token},
                Cmd.action(switchContent(getDefaultContentForRole(action.res.rolle)))
            );
        }
        case LOGIN_POST_FAILED:
            alert("Netzwerkfehler");
            return{...state, attemptingLogin: false}
        case LOAD_USER_DATA:
            return loop(
                {...state, userId: action.userId, role: action.role, request_token: action.request_token, loggedIn: true},
                Cmd.action(switchContent(getDefaultContentForRole(action.role)))
            );
        case LOGOUT_ACTION:
            return{...state, loggedIn: false}
        case SET_SCREEN_WIDTH_IS_MOBILE:
            return{...state, isScreenWidthMobile: action.isScreenWidthMobile}
        default:
            return state;
    }
}
