import { CLOSE_MENU, TOGGLE_MENU } from "./actionTypes"

export function escFunction (event, menu) {
    
    return dispatch => {
        if (event.keyCode === 27 && menu) {
            dispatch(closeMenu())
        } 
    }
} 

export function closeMenu() {
    return {

        type: CLOSE_MENU
    }
}

export function onToggleMenu () {
    return {
        type: TOGGLE_MENU
    }
}
