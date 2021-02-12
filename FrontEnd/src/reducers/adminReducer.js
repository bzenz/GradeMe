import {IS_USER_BEING_EDITED} from "../components/general/identifiers";

const DEFAULT_STATE = {isUserBeingEdited: false}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case IS_USER_BEING_EDITED:
            return {...state, isUserBeingEdited: action.isUserBeingEdited, editedUserId: action.userId};
        default:
            return state;
    }
}
