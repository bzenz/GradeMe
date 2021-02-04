import {IS_USER_BEING_EDITED} from "../components/general/identifiers";

export function setIsUserBeingEdited(isUserBeingEdited) {
    return {
        type: IS_USER_BEING_EDITED,
        isUserBeingEdited,
    }
}