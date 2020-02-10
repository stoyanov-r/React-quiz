import { CREATE_NEW_QUESTION, RESET_QUIZ } from "../actions/actionTypes";

const initialState = {
    quiz: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_NEW_QUESTION:
            return {
                ...state.quiz, quiz: [...state.quiz, action.newQuestion]
            }
        case RESET_QUIZ:
            return {
                ...state.quiz, quiz: []
            }
        default:
            return state
    }
}