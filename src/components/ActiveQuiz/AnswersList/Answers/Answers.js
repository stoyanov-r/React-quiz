import React from 'react';
import classes from './Answers.module.scss'

export default props => {
    const cls = [classes.Answers]
    if (props.answerResult) {
        cls.push(classes[props.answerResult])
    }

    return (
        <li onClick = {() => props.onAnswerClick(props.answer.id)} className={cls.join(' ')}>{props.answer.text}</li>
        )
    }


