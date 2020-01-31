import React from 'react';
import classes from './MenuToggle.module.scss'

export default props => {
    const cls = [
        classes.MenuToggle
    ]
    if (props.isOpened)
    {
        cls.push(classes.open) 
    }


    return (
        <button 
            className = {cls.join(' ')}
            onClick = {props.onMenuHandler}
        ></button>
    )
}