import React from 'react'
import classes from './AnswersList.module.scss'
import Answers from './Answers/Answers'


export default props => {
    return (
    
    <ul className={classes.AnswersList}>
        {props.answers.map((answer, index) => {
            if (props.answerResult) {
            }
            return (
                <Answers 
                key={index}
                answer={answer}
                onAnswerClick = {props.onAnswerClick}
                answerResult = {props.answerResult ? props.answerResult[answer.id] : null}
                />
            )
        })
    }
    </ul>
) }