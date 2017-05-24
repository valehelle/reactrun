import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const event = createReducer({
    'eventCreated': false,
    }, {
    [types.CREATE_EVENT](state, action) {
        return Object.assign({}, state, {
            eventCreated: action.eventCreated,
        })
    },
})