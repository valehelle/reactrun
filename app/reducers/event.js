import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const event = createReducer({
    'eventCreated': false,
    'eventID': null,
    'isEventIDUpdated': false,
    'eventDetails': {},
    }, {
    [types.CREATE_EVENT](state, action) {
        return Object.assign({}, state, {
            eventCreated: action.eventCreated,
            eventID: action.eventID,
        })
    },
    [types.REDIRECT_EVENT_DETAILS_DONE](state, action) {
        return Object.assign({}, state, {
            eventCreated: action.eventCreated,
            isEventIDUpdated: action.isEventIDUpdated,
            eventID: action.eventID,
        })
    },
    [types.GET_EVENT_LIST](state, action) {
        return Object.assign({}, state, {
            events: action.events,
        })
    },    
    [types.GET_EVENT_DETAILS](state, action) {
        return Object.assign({}, state, {
            eventDetails: action.eventDetails,
        })
    },
    [types.SET_CURRENT_EVENT_ID](state, action) {
        return Object.assign({}, state, {
            eventID: action.eventID,
            isEventIDUpdated: action.isEventIDUpdated,
        })
    },
})