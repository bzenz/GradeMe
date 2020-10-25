import {SET_COURSE, SET_SUBJECT} from "../actions/subjectSelectActions";

const defaultState = {subject: null, course: null}

export default (state = defaultState, action) => {
    switch(action.type){
        case(SET_SUBJECT):
            return {...state, subjectId: action.subjectId};
        case(SET_COURSE):
            return {...state, courseId: action.courseId}
        default: return state;
    }
}
