import React from 'react'
import { connect } from 'react-redux'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { fetchQuiz, onAnswerClick, repeatQuiz } from '../../store/actions/quiz'
import classes from './Quiz.module.scss'

class Quiz extends React.Component {
    
    componentDidMount () {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.onRepeatHandler()
    }



    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer the question, please</h1>
                    {  
                        this.props.loading || !this.props.quiz 
                            ? <Loader />
                            : this.props.isFinished
                                ? <FinishQuiz 
                                    results = {this.props.results}
                                    questions = {this.props.quiz}
                                    repeatHandler = {this.props.onRepeatHandler}
                                />
                                : <ActiveQuiz 
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question = {this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick = {this.props.onAnswerClick}
                                quizLength = {this.props.quiz.length}
                                activeQuestion = {this.props.activeQuestion + 1}
                                answerResult = {this.props.answerResult}
                                />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        results: state.quizList.results,
        isFinished: state.quizList.isFinished,
        answerResult: state.quizList.answerResult,
        activeQuestion: state.quizList.activeQuestion,
        loading: state.quizList.loading,
        quiz: state.quizList.quiz
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuiz(id)),
        onAnswerClick: answerId => dispatch(onAnswerClick(answerId)),
        onRepeatHandler: () => dispatch(repeatQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)