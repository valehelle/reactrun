import { combineReducers } from 'redux'
import * as recipesReducer from './recipes'
import * as exerciseReducer from './exercise'
import * as eventReducer from './event'
import * as runReducer from './run'

export default combineReducers(Object.assign(
    recipesReducer,
    exerciseReducer,
    eventReducer,
    runReducer,
    )
)