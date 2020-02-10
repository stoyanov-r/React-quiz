import axios from 'axios'

export default axios.create({
    baseURL: 'https://photoloader-71f22.firebaseio.com/'
})