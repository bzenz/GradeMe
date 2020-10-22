import {SHOW_EVALUATE_TASK_PAGE, SWITCH_TO_CONTENT} from '../actions/teacherNavigationActions';
import {COURSE_OVERVIEW_IDENTIFIER } from '../components/teacher/TeacherTabs';

const DEFAULT_STATE = {activeContent: COURSE_OVERVIEW_IDENTIFIER}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case SWITCH_TO_CONTENT:
            return {...state, activeContent: action.newContentIdentifier};
        case SHOW_EVALUATE_TASK_PAGE:
            return {...state, activeContent: SHOW_EVALUATE_TASK_PAGE, taskId: action.taskId, taskTitle: action.taskTitle}
        default:
            return state;
    }
}
