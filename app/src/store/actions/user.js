import { CHANGE_USER_AUTH, CHANGE_USER_DATA, LOGOUT_USER } from '../actionTypes'

export const changeUserAuth = (token, expiration) => {
    return { type: CHANGE_USER_AUTH, token, expiration }
}

export const changeUserData = (name, photo) => {
    return { type: CHANGE_USER_DATA, name, photo }
}

export const logoutUser = () => {
    return { type: LOGOUT_USER }
}