import { SET_IS_DRAWER_OPEN} from "../actions/generalNavigationActions";

const DEFAULT_STATE = {isDrawerOpen: true, drawerWidth: 290}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case SET_IS_DRAWER_OPEN:
            return {...state, isDrawerOpen: action.isDrawerOpen};
        default:
            return state;
    }
}