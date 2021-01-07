import { SWITCH_TO_CONTENT, SHOW_EVALUATE_TASK_PAGE, SET_IS_TASK_BEING_EDITED } from '../actions/teacherNavigationActions';
import {SUBJECT_OVERVIEW_IDENTIFIER } from '../components/teacher/TeacherTabs';
import { ERROR_CONTENT_IDENTIFIER } from "../actions/errorActions";
import { EDIT_TASK } from "../components/Taskoverview";

const DEFAULT_STATE = {activeContent: SUBJECT_OVERVIEW_IDENTIFIER}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
      case SWITCH_TO_CONTENT:
            return {...state, activeContent: action.newContentIdentifier, previousContent: state.activeContent};
      case SHOW_EVALUATE_TASK_PAGE:
            return {...state, taskId: action.taskId, taskTitle: action.taskTitle};
      case ERROR_CONTENT_IDENTIFIER:
            return {...state, activeContent:  ERROR_CONTENT_IDENTIFIER, errorMessageToUser: action.errorMessageToUser};
      case EDIT_TASK:
            return {...state, taskId: action.taskId, taskTitle: action.taskTitle, taskGraded: action.taskGraded, taskDeadline: action.taskDeadline, taskDescription: action.taskDescription, taskCourseId: action.taskCourseId};
      case SET_IS_TASK_BEING_EDITED:
            return {...state, isTaskBeingEdited: action.isTaskBeingEdited};
      default:
            return state;
    }
}
