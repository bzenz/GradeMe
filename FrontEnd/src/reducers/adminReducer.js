import {IS_USER_BEING_EDITED, SET_USER_IN_CURRENT_COURSE} from "../components/general/identifiers";

const DEFAULT_STATE = {isUserBeingEdited: false, userInCurrentCourse: []}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case IS_USER_BEING_EDITED:
            return {...state, isUserBeingEdited: action.isUserBeingEdited, editedUserId: action.userId};
        case SET_USER_IN_CURRENT_COURSE:
            return {...state, userInCurrentCourse: action.userIds};
        default:
            return state;
    }
}
