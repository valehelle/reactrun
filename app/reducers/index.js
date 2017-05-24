import { combineReducers } from 'redux'
import * as recipesReducer from './recipes'
import * as exerciseReducer from './exercise'
import * as eventReducer from './event'

export default combineReducers(Object.assign(
    recipesReducer,
    exerciseReducer,
    eventReducer,
    )
)