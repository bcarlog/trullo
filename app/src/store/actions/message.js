import { PUT_MESSAGE, DELETE_MESSAGE } from '../actionTypes'

export const putMessage = (message, color) => {
    return { type: PUT_MESSAGE, message, color }
}

export const deleteMessage = () => {
    return { type: DELETE_MESSAGE }
}