import { FETCH_QUIZ_START, 
    FETCH_QUIZ_SUCCESS, 
    FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZ_ERROR, 
    GET_ANSWER_RESULT, 
    FINISH_QUIZ,
    GO_TO_NEXT_QUESTION,
    REPEAT_QUIZ} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    answerResult: null,
    activeQuestion: 0,
    quiz: null
}

export default function (state = initialState, action) {
        switch (action.type) {
            case FETCH_QUIZ_START:
                return {
                    ...state, loading: true
                }
            case FETCH_QUIZES_SUCCESS:
                return {
                    ...state, loading: false, quizes: action.quizes
                }
            case FETCH_QUIZ_ERROR:
                return {
                   ...state, loading: false, quizes: action.error
                }
            case FETCH_QUIZ_SUCCESS:
                return {
                    ...state, loading: false, quiz: action.quiz
                }
            case GET_ANSWER_RESULT:
                return {
                    ...state, answerResult: action.answerResult, results: action.results
                }
            case FINISH_QUIZ:
                return {
                    ...state, isFinished: true
                }
            case GO_TO_NEXT_QUESTION:
                return {
                    ...state, answerResult: null, activeQuestion: action.activeQuestion + 1
                }
            
            case REPEAT_QUIZ: {
                return {
                    ...state, results: {}, isFinished: false, activeQuestion: 0, answerResult: null
                }
            }
            default:
                return state;
        }
    }
