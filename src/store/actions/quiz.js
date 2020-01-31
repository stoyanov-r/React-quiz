import axios from '../../axios/axios-quiz'
import { FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZ_ERROR, 
    FETCH_QUIZ_START, 
    FETCH_QUIZ_SUCCESS, 
    GET_ANSWER_RESULT,
    FINISH_QUIZ,
    GO_TO_NEXT_QUESTION,
    REPEAT_QUIZ } from './actionTypes'

export const fetchQuizList = () => {
    return async dispatch => {
        dispatch(fetchQuizStart())
        try {
            const response = await axios.get('/quizes.json')

            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name:`Quiz №${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (error) {
            dispatch(fetchQuizError(error))
        }
    } 
}

export const fetchQuiz = (quizId) => {
    return async dispatch => {
        dispatch(fetchQuizStart())
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz))
            } catch (error) {
                dispatch(fetchQuizError())
         }
    } 
} 

export function fetchQuizStart() {
    return {
       type: FETCH_QUIZ_START
    } 
}

export function fetchQuizesSuccess(quizes) {

    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz,
    }
}

export function fetchQuizError(error) {
    return {
        type: FETCH_QUIZ_ERROR,
        error
    }
}

export function getAnswerResult (answerResult, results) {
    return {
        type: GET_ANSWER_RESULT,
        answerResult, results
    }
}

export function finishQuiz () {
    return {
        type: FINISH_QUIZ
    }
}

export function goToNextQuestion(activeQuestion) {
    return {
        type: GO_TO_NEXT_QUESTION,
        activeQuestion
    }
}

export function onAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quizList
    
        if (state.answerResult) {
            const key = Object.keys(state.answerResult)[0]
            if (state.answerResult[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results
        
        if (answerId === question.rightAnswer) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(getAnswerResult({[answerId] : 'success'}, results))

            window.setTimeout(()=> {
                if ((state.activeQuestion + 1) === state.quiz.length){
                    dispatch(finishQuiz())
                } else {
                    dispatch(goToNextQuestion(state.activeQuestion))

                }
            }, 1000)
        } else {
            results[question.id] = 'error'
            dispatch(getAnswerResult({[answerId] : 'error'}, results))
        }
    }
}

export function repeatQuiz () {
    return {
        type: REPEAT_QUIZ
    }
}