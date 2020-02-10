import axios from '../../axios/axios-photoloader'
import { FETCH_TOPIC_START, 
  FETCH_TOPICS_SUCCESS, 
  FETCH_TOPIC_SUCCESS, 
  FETCH_TOPIC_ERROR,
  TOGGLE_EDITOR,
  CHANGE_TASK,

} from './actionTypes'

  
export const fetchTopicList = () => {
  return async dispatch => {
    dispatch(fetchTopicStart())
    try {
      const response = await axios.get('/topics.json');
      const topics = [];
      Object.keys(response.data).forEach((key, index) => {
        topics.push({
          id: key,
          name: `TOPIC №${index + 1}`
        })
      })
      dispatch(fetchTopicsSuccess(topics))
    } catch (error) {
      dispatch(fetchTopicError(error))
    }
  }
}

export const fetchTopic = (topicId) => {
    return async dispatch => {
        dispatch(fetchTopicStart())
        try {
            const response = await axios.get(`/topics/${topicId}.json`)
            const topic = response.data;
            dispatch(fetchTopicSuccess(topic))
            } catch (error) {
                dispatch(fetchTopicError())
         }
    } 
} 

export function fetchTopicStart() {
    return {
       type: FETCH_TOPIC_START
    } 
}

export function fetchTopicsSuccess(topics) {

    return {
        type: FETCH_TOPICS_SUCCESS,
        topics
    }
}

export function fetchTopicSuccess(topic) {
    return {
        type: FETCH_TOPIC_SUCCESS,
        topic,
    }
}

export function fetchTopicError(error) {
    return {
        type: FETCH_TOPIC_ERROR,
        error
    }
}

export function toggleEditor() {
  return {
    type: TOGGLE_EDITOR
  }
}

export function changeTask(index, newTask) {
  return {
    type: CHANGE_TASK,
    index, newTask
  }
}

export function saveChanges (topicId, index, newTask) { 
  return async (dispatch, getState) => {
    dispatch(changeTask(index, newTask))
    await axios.put(`/topics/${topicId}/.json`, getState().topicList.topic)
  }
}