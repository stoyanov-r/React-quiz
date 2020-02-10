import React, { Component } from 'react';
import classes from './QuizCreator.module.scss';
import Button from '../../components/UI/Button/Button';
import {CreateControls, validateControl} from '../../form/FormFramework/FormFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import { createQuestion, createNewQuiz } from '../../store/actions/quizCreator';





function createOption (number) {
    return CreateControls({
        label: `Answer ${number}`,
        errorMessage: 'Required field',
        id: number,
        value: ''
    }, {required: true}) 
}

function createFormControls () {
    return {
        question: CreateControls({
            label: 'Enter your question',
            errorMessage: 'Required field',
            value: ''
        }, {required: true}),
        option1: createOption(1),
        option2: createOption(2),
        option3: createOption(3),
        option4: createOption(4)
    }
}


export class QuizCreator extends Component {

    state = {
        isFormValid: false,
        rightAnswer: 1,
        formControls: createFormControls()
    }

    onCreateButtonHandler = async evt => {
        evt.preventDefault()
        this.props.createNewQuiz()
        // try {
        //     await axios.post('https://react-quiz-4ba42.firebaseio.com/quizes.json', this.state.quiz)
        //     this.setState({
        //         quiz: []
        //     })
        // } catch(error) {
        //     console.error();
        // } 

        // axios.post('https://react-quiz-4ba42.firebaseio.com/quizes.json', this.state.quiz)
        //     .then(response => {console.log(response)})
        //     .catch(error => console.log(error))
        // console.log(this.state.quiz)
    }


    onAddButtonHandler = evt => {
        evt.preventDefault()
        const {question, option1, option2, option3, option4} = this.state.formControls
        const newQuestion = {
            question: question.value,
            rightAnswer: this.state.rightAnswer,
            id: this.props.quiz.length + 1,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }

        this.props.createNewQuestion(newQuestion)
        // quiz.push(newQuestion)

        this.setState({
            isFormValid: false,
            rightAnswer: 1,
            formControls: createFormControls()
        })
    }

    onSubmitHandler = evt => {
        evt.preventDefault()
    }

    onChangeHandler = (value, controlName) => {

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = value
        control.touched = true
        control.valid = validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid === true && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })


    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Auxiliary key = {controlName + index}>
                    <Input 
                        label = {control.label}
                        value = {control.value}
                        valid = {control.valid}
                        touched = {control.touched}
                        errorMessage = {control.errorMessage}
                        shouldValidate = {!!control.validation} 
                        onChange = {(event) => this.onChangeHandler(event.target.value, controlName)}
                    />

                    {index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        })
    }

    onSelectHandler = evt => {
        evt.preventDefault()
        this.setState({
            rightAnswer: +evt.target.value
        })
    }

    render() {
        const select = <Select 
            label = 'Enter right answer'
            value = {this.state.rightAnswer}
            onChange = {this.onSelectHandler}
            options = {[
                {value: 1, text: 1},
                {value: 2, text: 2},
                {value: 3, text: 3},
                {value: 4, text: 4} 
            ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Quiz Creator</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        {this.renderControls()}
                        
                        {select}

                        <Button 
                            type='primary'
                            onClick={this.onAddButtonHandler}
                            disabled = {!this.state.isFormValid}
                        >Add question</Button>

                        <Button 
                            type='success'
                            onClick={this.onCreateButtonHandler}
                            disabled={this.props.quiz.length < 1}
                        >Create test</Button>

                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        quiz: state.creator.quiz
    }
}

function mapDispatchToProps (dispatch) {
    return {
        createNewQuestion: newQuestion => dispatch(createQuestion(newQuestion)),
        createNewQuiz: () => dispatch(createNewQuiz())
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
