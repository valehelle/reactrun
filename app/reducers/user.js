import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const user = createReducer({
    'unit': 'Meter', 
    }, {
    [types.SET_USET_DETAILS](state, action) {
        return Object.assign({}, state, {
            unit: action.userDetail.unit
        })
    },
    [types.SET_USET_DETAILS_UNIT](state, action) {
        return Object.assign({}, state, {
            unit: action.userDetail.unit
        })
    }
})