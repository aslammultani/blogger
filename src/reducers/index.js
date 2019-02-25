import { combineReducers } from 'redux'
import sessionReducer from './sessionReducer'
import userReducer from './userReducer'
// import blogReducer from './blogReducer'

const rootReducer = combineReducers({
  userReducer,
  sessionReducer,
  // blogReducer
})

export default rootReducer
