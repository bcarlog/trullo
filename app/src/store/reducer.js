import { combineReducers } from 'redux'
import userReducer from './reducers/user'
import messageReducer from './reducers/message'
import boardReducer from './reducers/board'

export default combineReducers({user: userReducer, message: messageReducer, board: boardReducer})