export const SET_IS_DRAWER_OPEN = "SET_IS_DRAWER_OPEN";

export function setDrawerOpenState(isDrawerOpen) {
    return {
        type: SET_IS_DRAWER_OPEN,
        isDrawerOpen,
    }
}