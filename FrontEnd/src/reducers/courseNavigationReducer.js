import {SET_COURSE, SET_SUBJECT, UNSELECT_COURSE} from "../actions/subjectSelectActions";

const defaultState = {subject: null, course: null, courseSelected: false}

export default (state = defaultState, action) => {
    switch(action.type){
        case(SET_SUBJECT):
            return {...state, subjectId: action.subjectId};
        case(SET_COURSE):
            return {...state, courseId: action.courseId, courseSelected: true}
        case(UNSELECT_COURSE):
            return {...state, subjectId: null, courseSelected: false}
        default: return state;
    }
}
