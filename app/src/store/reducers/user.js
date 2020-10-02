import { CHANGE_USER_AUTH } from '../actions/user'
import { CHANGE_USER_DATA } from '../actions/user'
import { LOGOUT_USER } from '../actions/user'

const initializeState = {
    token: localStorage.getItem('token') || null,
    expiration: localStorage.getItem('expiration') || null,
    name: localStorage.getItem('name') || null,
    photo: localStorage.getItem('photo') || null,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false
}

const userReducer = (state = initializeState, action) => {
    switch (action.type) {
        case CHANGE_USER_AUTH:
            const { token, expiration } = action
            localStorage.setItem('token', token)
            localStorage.setItem('expiration', expiration)
            localStorage.setItem('isAuthenticated', true)
            return { ...state, token, expiration, isAuthenticated: true }
        case CHANGE_USER_DATA:
            const { name, photo } = action
            localStorage.setItem('name', name)
            localStorage.setItem('photo', photo)
            return { ...state, name, photo }
        case LOGOUT_USER:
            localStorage.setItem('token', null)
            localStorage.setItem('name', null)
            localStorage.setItem('photo', null)
            localStorage.setItem('expiration', null)
            localStorage.setItem('isAuthenticated', false)
            return { ...state, token: null, name: null, expiration: null, photo: null, isAuthenticated: false }
        default:
            return state
    }
}

export default userReducer