import { PUT_MESSAGE, DELETE_MESSAGE } from '../actionTypes'

const initializeState = {
    message: '',
    color: ''
}

const messageReducer = (state = initializeState, action) => {
    switch (action.type) {
        case PUT_MESSAGE:
            const { message, color } = action
            return { ...state, message, color }
        case DELETE_MESSAGE:
            return { ...state, message: '', color: '' }
        default:
            return state
    }
}

export default messageReducer