import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-4ba42.firebaseio.com/'
})