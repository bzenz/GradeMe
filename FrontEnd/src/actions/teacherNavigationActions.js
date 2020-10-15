export const SWITCH_TO_CONTENT = "SWITCH_TO_CONTENT";

export function switchContent(newContentIdentifier){
    return {
        type: SWITCH_TO_CONTENT,
        newContentIdentifier
    }
}
