import React from 'react';
import cls from './FinishQuiz.module.scss'
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom'

export default (props) => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)
    return (
        <div className={cls.FinishQuiz}>
            <ol>
                {props.questions.map((quizItem, index) => {
                    return (
                        
                        <li key={index}>{quizItem.question}<span className = {
                            props.results[quizItem.id] === 'error'
                            ? cls.cross : cls.check}></span></li>
                    )
                })}
            </ol>
            <p>Right answers: {successCount} from {props.questions.length}</p>
            <Button onClick = {props.repeatHandler} type='primary'> Repeat</Button>
            <Link to={'/'}>
                <Button type='success'> Back to all quizes</Button>
            </Link>
        </div>
    )

}
    
