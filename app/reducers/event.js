import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const event = createReducer({
    'eventCreated': false,
    'eventID': null,
    'isEventIDUpdated': false,
    'eventDetails': {},
    'events': [],
    'goToDetail': false,
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
            goToDetail: action.goToDetail,
        })
    },
    [types.GET_EVENT_LIST](state, action) {
        return Object.assign({}, state, {
            events: action.events,
        })
    },
    [types.SET_CURRENT_EVENT_ID](state, action) {
        return Object.assign({}, state, {
            eventID: action.eventID,
        })
    },    
    [types.GO_TO_DETAIL](state, action) {
        return Object.assign({}, state, {
            goToDetail: action.goToDetail,
        })
    },
})

export const currentEvent = createReducer({
    'event': {},
    'distanceWeeklyLeft': 0,
    'distanceWeekly': 0,
    'overallDistanceTravelled': 0,
    'overallDistanceLeft': 0,
    'daysLeft': 0,
    'name': '',
    'totalDistance': 0,
    'distanceWeeklyRun': 0,
    'eventID': '',
    'runs': [],
    'dateStart': new Date(),
    'dateEnd': new Date(),
    'distanceGoal': 0,
    }, {
    [types.GET_CURRENT_EVENT](state, action) {
        return Object.assign({}, state, {
            eventID: action.eventID,
            overallDistanceTravelled: action.overallDistanceTravelled,
            overallDistanceLeft: action.overallDistanceLeft,
            daysLeft: action.daysLeft,
            name: action.name,
            totalDistance: action.totalDistance,
            runs: action.runs,
            dateStart: action.dateStart,
            dateEnd: action.dateEnd,
            distanceWeekly: action.distanceWeekly,
            distanceWeeklyRun: action.distanceWeeklyRun,
            distanceWeeklyLeft: action.distanceWeeklyLeft,
            distanceGoal: action.distanceGoal,
        })
    },
    
})

export const latestEvent = createReducer({
    'event': {},
    'distanceWeeklyLeft': 0,
    'distanceWeekly': 0,
    'overallDistanceTravelled': 0,
    'overallDistanceLeft': 0,
    'daysLeft': 0,
    'name': '',
    'totalDistance': 0,
    'distanceWeeklyRun': 0,
    'eventID': '',
    }, {
    [types.GET_LATEST_EVENT](state, action) {
        return Object.assign({}, state, {
            eventID: action.eventID,
            overallDistanceTravelled: action.overallDistanceTravelled,
            overallDistanceLeft: action.overallDistanceLeft,
            daysLeft: action.daysLeft,
            name: action.name,
            totalDistance: action.totalDistance,
            distanceWeekly: action.distanceWeekly,
            distanceWeeklyRun: action.distanceWeeklyRun,
            distanceWeeklyLeft: action.distanceWeeklyLeft,
        })
    },
    
})