import { RESET_TOPIC, CREATE_NEW_TASK } from "./actionTypes";
import axios from 'axios';

export function createTask (newTask) {
    return {
        type: CREATE_NEW_TASK,
        newTask
    }
    
}

export function createNewTopic () {
    return async (dispatch, getState) => {
        await axios.post('https://photoloader-71f22.firebaseio.com/topics.json', getState().photoloader.tasks)
        dispatch (resetTopic())
    }
}

export function resetTopic () {
    return {
        type: RESET_TOPIC
    }
}