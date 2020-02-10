import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            'email': email,
            'password': password,
            'returnSecureToken': true
        }
        let url = isLogin 
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1lQ4R8dXtHPojMrjXg-YIgmee9yAwZyA' 
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1lQ4R8dXtHPojMrjXg-YIgmee9yAwZyA'
        
            const response = await axios.post(url, authData)
            const data = response.data
            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000) 

            
            localStorage.setItem('expDate', expirationDate)
            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)

        

        dispatch(authSuccess(data.idToken))
        dispatch (authLogout(data.expiresIn))
    }
}

export function authSuccess (token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function authLogout (time) {
    return dispatch => {
        setTimeout( () => dispatch(logout()), time * 1000)
    }
}

export function logout () {
    localStorage.removeItem('expDate')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin () {
    return dispatch => {
        const token = localStorage.getItem('token')
        const expirationDate = localStorage.getItem('expDate')
        const expirationTime = (new Date(expirationDate).getTime() - new Date()) / 1000

        if (!token) {
            dispatch(logout())
        } else {
            dispatch(authSuccess(localStorage.getItem('userId')))
            dispatch (authLogout(expirationTime))
        }
    }
}