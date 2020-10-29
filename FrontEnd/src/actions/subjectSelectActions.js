export const SET_SUBJECT = "SET_SUBJECT";
export const SET_COURSE = "SET_COURSE";
export const UNSELECT_COURSE = "UNSELECT_COURSE";

export function setSubject(subjectId, subjectName){
    return {
        type: SET_SUBJECT,
        subjectId,
        subjectName
    }
}

export function setCourse(courseId, courseYear, courseSubjectName){
    return {
        type: SET_COURSE,
        courseId,
        courseYear,
        courseSubjectName,
    }
}

export function unselectCourse(){
    return {
        type: UNSELECT_COURSE,
    }
}
