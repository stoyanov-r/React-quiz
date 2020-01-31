import { CLOSE_MENU, TOGGLE_MENU } from "../actions/actionTypes";

const initialState = {
    menu: false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case CLOSE_MENU:
            return {
                ...state, menu: false
            }

        case TOGGLE_MENU: 
        return {
            ...state, menu: !state.menu
        }
    
        default:
            return state
    }
}