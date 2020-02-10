import { CREATE_NEW_QUESTION, RESET_QUIZ } from "./actionTypes";
import axios from 'axios';


export function createQuestion (newQuestion) {
    return {
        type: CREATE_NEW_QUESTION,
        newQuestion
    }
    
}

export function createNewQuiz () {
    return async (dispatch, getState) => {
        await axios.post('https://react-quiz-4ba42.firebaseio.com/quizes.json', getState().creator.quiz)
        dispatch (resetQuiz())
    }
    
}

export function resetQuiz () {
    return {
        type: RESET_QUIZ
    }
}