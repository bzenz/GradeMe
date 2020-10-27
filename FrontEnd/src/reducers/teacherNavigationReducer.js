import { SWITCH_TO_CONTENT, SHOW_EVALUATE_TASK_PAGE } from '../actions/teacherNavigationActions';
import {SUBJECT_OVERVIEW_IDENTIFIER } from '../components/teacher/TeacherTabs';

const DEFAULT_STATE = {activeContent: SUBJECT_OVERVIEW_IDENTIFIER}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case SWITCH_TO_CONTENT:
            return {...state, activeContent: action.newContentIdentifier};
        case SHOW_EVALUATE_TASK_PAGE:
            return {...state, taskId: action.taskId, taskTitle: action.taskTitle}
        default:
            return state;
    }
}
