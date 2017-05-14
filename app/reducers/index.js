import { combineReducers } from 'redux'
import * as recipesReducer from './recipes'
import * as exerciseReducer from './exercise'

export default combineReducers(Object.assign(
    recipesReducer,
    exerciseReducer,
    )
)