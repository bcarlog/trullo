import { combineReducers } from 'redux'
import userReducer from './reducers/user'
import configReducer from './reducers/config'
import boardReducer from './reducers/board'

export default combineReducers({user: userReducer, config: configReducer, board: boardReducer})