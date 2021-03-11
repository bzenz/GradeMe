import {IS_USER_BEING_EDITED, SET_USER_IN_CURRENT_COURSE} from "../components/general/identifiers";

export function setIsUserBeingEdited(isUserBeingEdited, userId) {
    return {
        type: IS_USER_BEING_EDITED,
        isUserBeingEdited,
        userId,
    }
}

export function setUserInCurrentCourse(userIds) {
    return {
        type: SET_USER_IN_CURRENT_COURSE,
        userIds
    }
}