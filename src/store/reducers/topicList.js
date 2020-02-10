import {
    FETCH_TOPIC_START,
    FETCH_TOPICS_SUCCESS,
    FETCH_TOPIC_ERROR,
    FETCH_TOPIC_SUCCESS,
    TOGGLE_EDITOR,
    CHANGE_TASK,
    
} from "../actions/actionTypes";

const initialState = {
    topics: [],
    loading: false,
    error: null,
    topic: null,
    isEdit: false
}

export default function (state = initialState, action) {

    switch (action.type) {
        case FETCH_TOPIC_START:
            return {
                ...state, loading: true
            }
        case FETCH_TOPICS_SUCCESS:
            return {
                ...state, loading: false, topics: action.topics
            }
        case FETCH_TOPIC_ERROR:
            return {
                ...state, loading: false, topics: action.error
            }
        case FETCH_TOPIC_SUCCESS:
            return {
                ...state, loading: false, topic: action.topic
            }
        case TOGGLE_EDITOR:
            return {
                ...state, isEdit: !state.isEdit
            }
        case CHANGE_TASK:
            const topic = state.topic
            topic[action.index] = action.newTask
            console.log(topic);
            return {
                ...state, topic
            }

        default:
            return state;
    }
}
