import { createStore as reduxCreateStore } from 'redux'
import rootReducer from '../reducers'

const createStore = () => reduxCreateStore(rootReducer)
export default createStore
