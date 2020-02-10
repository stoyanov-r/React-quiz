import React, { Component } from 'react';
import classes from './Photoloader.module.scss';
import Button from '../../components/UI/Button/Button';
import { CreateControls, validateControl } from '../../form/FormFramework/FormFramework';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import { createTask, createNewTopic } from '../../store/actions/photoloader';
import Previewer from '../../components/UI/Previewer/Previewer';


function createFormControls() {
  return {
    topic: CreateControls({
      label: 'Enter topic-name',
      value: ''
    }, { required: true }),
    photoUrl: CreateControls({
      label: `Paste photo's URL`,
      value: ''
    }, { required: false }),
    task: CreateControls({
      label: 'Enter task-name',
      value: ''
    }, { required: true }),
  }
}


export class PhotoLoader extends Component {

  state = {
    isFormValid: false,
    formControls: createFormControls(),
    photoUrls: []
  }

  onCreateButtonHandler = async evt => {
    evt.preventDefault()
    this.props.createNewTopic()
  }


  onAddButtonHandler = evt => {
    evt.preventDefault()
    const { topic, task } = this.state.formControls
    const newTask = {
      topic: topic.value,
      task: task.value,
      photoUrls: this.state.photoUrls
    }

    this.props.createNewTask(newTask)

    this.setState({
      isFormValid: false,
      formControls: createFormControls(),
      photoUrls: []
    })
  }

  onSubmitHandler = e => {
    e.preventDefault()
  }

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

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

  keyPressHandler(event, controlName) {
    if (event.charCode === 13 && controlName.toString() === 'photoUrl') {
      const photoUrls = this.state.photoUrls.concat(this.state.formControls.photoUrl.value);
      const formControls = { ...this.state.formControls };

      formControls.photoUrl.value = '';

      this.setState({
        photoUrls,
        formControls
      })

    }
  }
  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={(event) => this.onChangeHandler(event.target.value, controlName)}
            onKeyPress={event => this.keyPressHandler(event, controlName)}
          />

          {index === 0 ? <hr /> : null}

        </Auxiliary>
      )
    })
  }

  render() {
    return (
      <div className={classes.Photoloader}>
        <div>
          <h1>Photoloader</h1>
          <form onSubmit={e => e.keyCode !== 13 && this.onSubmitHandler(e)}>
            {this.renderControls()}

            <Previewer imageUrls={this.state.photoUrls} />

            <Button
              type='primary'
              onClick={this.onAddButtonHandler}
              disabled={!this.state.isFormValid}
            >Save task</Button>

            <Button
              type='success'
              onClick={this.onCreateButtonHandler}
              disabled={this.props.tasks.length < 1}
            >Save topic</Button>

          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.photoloader.tasks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createNewTask: newTask => dispatch(createTask(newTask)),
    createNewTopic: () => dispatch(createNewTopic())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoLoader);
