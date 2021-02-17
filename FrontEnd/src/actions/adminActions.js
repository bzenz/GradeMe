import {IS_USER_BEING_EDITED} from "../components/general/identifiers";

export function setIsUserBeingEdited(isUserBeingEdited, userId) {
    return {
        type: IS_USER_BEING_EDITED,
        isUserBeingEdited,
        userId,
    }
}