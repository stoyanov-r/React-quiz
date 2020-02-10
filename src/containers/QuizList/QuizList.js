import React, { Component } from 'react';
import classes from './QuizList.module.scss';
import {NavLink} from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux'
import { fetchQuizList } from '../../store/actions/quiz';

export class QuizList extends Component {

    renderQuizList () {
        
        return (this.props.quizes.map(quiz => {
            return (
            <li key={quiz.id}>
                <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
            </li>
            )
        }))
    }

    componentDidMount() {
        this.props.fetchQuizList()
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div className = {classes.center}>
                    <h1>Quiz List</h1>
                    { this.props.loading && this.props.quizes.length > 0
                        ? <Loader />
                        : <ul> {this.renderQuizList()} </ul>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        quizes: state.quizList.quizes,
        loading: state.quizList.loading
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchQuizList: () => dispatch(fetchQuizList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
