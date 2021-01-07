import { EDIT_TASK } from "../components/Taskoverview";

export const SWITCH_TO_CONTENT = "SWITCH_TO_CONTENT";
export const SHOW_EVALUATE_TASK_PAGE = "SHOW_EVALUATE_TASK_PAGE";
export const SET_IS_TASK_BEING_EDITED = "SET_IS_TASK_BEING_EDITED";

export function switchContent(newContentIdentifier, errorMessageToUser){
    return {
        type: SWITCH_TO_CONTENT,
        newContentIdentifier,
        errorMessageToUser,
    }
}

export function showEvaluateTaskPage(taskId, taskTitle) {
    return {
        type: SHOW_EVALUATE_TASK_PAGE,
        taskId: taskId,
        taskTitle: taskTitle,
    }
}

export function setDetailsOfEditedTask(taskId, title, graded, deadline, description, courseId) {
  return {
    type: EDIT_TASK,
    taskId: taskId,
    taskTitle: title,
    taskGraded: graded,
    taskDeadline: deadline,
    taskDescription: description,
    taskCourseId: courseId,
  }
}

export function setIsTaskBeingEdited(isTaskBeingEdited) {
  return {
    type: SET_IS_TASK_BEING_EDITED,
    isTaskBeingEdited: isTaskBeingEdited,
  }

}