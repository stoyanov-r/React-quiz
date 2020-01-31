import {combineReducers} from 'redux'
import quizList from './quizList'
import quizCreator from './quizCreator'
import auth from './auth'
import layout from './layout'


export default combineReducers({
    quizList,
    creator: quizCreator,
    auth,
    layout
})
