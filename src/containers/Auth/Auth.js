import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.scss';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                label: 'Email',
                type: 'email',
                valid: false,
                touched: false,
                errorMessage: 'Enter valid email',
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                label: 'Password',
                type: 'password',
                valid: false,
                touched: false,
                errorMessage: 'Enter valid password',
                validation: {
                    required: true,
                    minLength: 8
                }
            }
        }
    }

    sumbmitHandler = (evt) => {
        evt.preventDefault()
    }

    loginHandler = async () => {
        this.props.auth(
            this.state.formControls.email.value, 
            this.state.formControls.password.value, 
            true)
    }

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value, 
            this.state.formControls.password.value, 
            false)
    }

    validateControl (value, validation) {
        if(!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler (event, controlName) {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid === true && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })


    }

    renderInput () {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input 
                    key = {controlName + index}
                    label = {control.label}
                    inputType = {control.type}
                    valid = {control.valid}
                    touched = {control.touched}
                    errorMessage = {control.errorMessage}
                    shouldValidate = {!!control.validation} 
                    onChange = {(event) => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }



    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authentication</h1>
                    <form 
                        onSubmit={this.sumbmitHandler}
                        className={classes.AuthForm}
                    >
                        {this.renderInput()}
                    
                        <Button 
                            type='success' 
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >Login</Button>
                        <Button 
                            type='primary' 
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >Register</Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);
