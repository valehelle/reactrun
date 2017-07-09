import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const promo = createReducer({
    'events': [],
    }, {
    [types.SET_PROMO_EVENTS](state, action) {
        return Object.assign({}, state, {
            events: action.events
        })
    },
})