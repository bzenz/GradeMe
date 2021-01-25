import { SWITCH_TO_CONTENT, SHOW_EVALUATE_TASK_PAGE } from '../actions/teacherNavigationActions';
import { ERROR_CONTENT_IDENTIFIER } from "../actions/errorActions";
import {SUBJECT_OVERVIEW_IDENTIFIER} from "../components/general/identifiers";

//Active Content in Main Panel defaults zu diesem Wert. Für Testzwecke, kann die zu testende Seite hier eingetragen werden
const DEFAULT_STATE = {activeContent: SUBJECT_OVERVIEW_IDENTIFIER}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
      case SWITCH_TO_CONTENT:
            return {...state, activeContent: action.newContentIdentifier, previousContent: state.activeContent};
        case SHOW_EVALUATE_TASK_PAGE:
            return {...state, taskId: action.taskId, taskTitle: action.taskTitle};
        case ERROR_CONTENT_IDENTIFIER:
            return {...state, activeContent:  ERROR_CONTENT_IDENTIFIER, errorMessageToUser: action.errorMessageToUser}
        default:
            return state;
    }
}
