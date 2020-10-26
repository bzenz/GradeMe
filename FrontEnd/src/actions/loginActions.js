export const INIT = "INIT";
export const LOGIN_POST_SUCCESSFULL = "LOGIN_POST_SUCCESSFULL";
export const LOGIN_POST_FAILED = "LOGIN_POST_FAILED";
export const RESPONSE_PARSED = "RESPONSE_PARSED";
export const LOAD_USER_DATA = "LOAD_USER_DATA";

export function init(username, password){
    return{
        type: INIT,
        username,
        password
    }
}

export function loginPostFailed(err){
    return{
        type: LOGIN_POST_FAILED,
        err
    }
}

export function loginPostSuccessfull(res){
    return{
        type: LOGIN_POST_SUCCESSFULL,
        res,
    }
}

export function responseParsed(res){
    return{
        type: RESPONSE_PARSED,
        res
    }
}

export function loadUserData(userId, role, request_token){
    return{
        type: LOAD_USER_DATA,
        userId,
        role,
        request_token,
    }
}