import React from 'react'
import classes from './ActiveQuiz.module.scss'
import AnswersList from './AnswersList/AnswersList'

export default props => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{props.activeQuestion}. </strong>
                    {props.question}
                </span>
    <small>{props.activeQuestion}/{props.quizLength}</small>
            </p>
            <AnswersList 
            answers={props.answers} 
            onAnswerClick = {props.onAnswerClick}
            answerResult = {props.answerResult}
            />
        </div>
    )
}