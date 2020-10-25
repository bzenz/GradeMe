export const SET_SUBJECT = "SET_SUBJECT";
export const SET_COURSE = "SET_COURSE";

export function setSubject(subjectId){
    return {
        type: SET_SUBJECT,
        subjectId
    }
}

export function setCourse(courseId){
    return {
        type: SET_COURSE,
        courseId
    }
}
