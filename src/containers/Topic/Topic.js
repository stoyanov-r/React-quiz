import React from 'react'
import { connect } from 'react-redux'
import Loader from '../../components/UI/Loader/Loader'
import { fetchTopic } from '../../store/actions/topicList'
import classes from './Topic.module.scss'
import Task from '../../components/Task/Task'

class Topic extends React.Component {

  componentDidMount() {
    this.props.fetchTopicById(this.props.match.params.id)
  }

  render() {
    return (
      <div className={classes.Topic}>
        <div className={classes.TopicWrapper}>
          <h1>Topic</h1>
          {
            this.props.loading || !this.props.topic
              ? <Loader />
              : <div>
                {this.props.topic.map((task, index) => (
                  <Task 
                    topicId={this.props.match.params.id} 
                    index={index} 
                    task={task} 
                    key={task+index}/>
                )) }
              </div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.topicList.loading,
    topic: state.topicList.topic
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTopicById: id => dispatch(fetchTopic(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topic)