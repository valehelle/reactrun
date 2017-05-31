import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const event = createReducer({
    'eventCreated': false,
    'eventID': null,
    'isEventIDUpdated': false,
    'eventDetails': {},
    'events': [],
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

export const latestEvent = createReducer({
    event: {},
    distanceWeeklyLeft: 0,
    distanceWeekly: 0,
    overallDistanceTravelled: 0,
    overallDistanceLeft: 0,
    daysLeft: 0,
    name: '',
    totalDistance: 0,
    distanceWeeklyRun: 0,
    }, {
    [types.GET_LATEST_EVENT](state, action) {
        return Object.assign({}, state, {
            eventID: action.eventID,
            event: action.event,
            distanceWeeklyLeft: action.distanceWeeklyLeft,
            overalldistanceTravelled: action.overallDistanceTravelled,
            overalldistanceLeft: action.overallDistanceLeft,
            daysLeft: action.daysLeft,
            name: action.name,
            totalDistance: action.totalDistance,
            distanceWeekly: action.distanceWeekly,
            distanceWeeklyRun: action.distanceWeeklyRun,
        })
    }, 
})