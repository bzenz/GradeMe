export const SWITCH_TO_CONTENT = "SWITCH_TO_CONTENT";
export const SHOW_EVALUATE_TASK_PAGE = "SHOW_EVALUATE_TASK_PAGE";

export function switchContent(newContentIdentifier){
    return {
        type: SWITCH_TO_CONTENT,
        newContentIdentifier
    }
}

export function showEvaluateTaskPage(taskTitle) {
    return {
        type: SHOW_EVALUATE_TASK_PAGE,
        taskTitle: taskTitle,

    }
}
