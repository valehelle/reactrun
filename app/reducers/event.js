import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const event = createReducer({
    'eventCreated': false,
    'eventID': null,
    'isEventIDUpdated': false,
    'eventDetails': {},
    'events': [],
    'goToDetail': false,
    'eventDeleted': true,
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
            eventDeleted: false,
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
    [types.DELETE_EVENT](state, action) {
        return Object.assign({}, state, {
            eventDeleted: true,
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
    'isEventNew': false,
    'bibNumber': '',
    'bannerSource': '' ,
    'isRunComplete': false,
    'refresh': false,
    'runDeleted': false,
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
            isEventNew: false,
            bibNumber: action.bibNumber,
            bannerSource: action.bannerSource,
            isRunComplete: action.isRunComplete,
            runDeleted: false,
            
        })
    },
    [types.CREATE_EVENT](state, action) {
        return Object.assign({}, state, {
            isEventNew: true,
        })
    },    
    [types.DELETE_RUN](state, action) {
        return Object.assign({}, state, {
            runDeleted: true,
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
    'bibNumber': '',
    'bannerSource': '' ,
    'isRunComplete': false,
    'dateStart': new Date(),
    'refresh': false,
    'runDeleted': false,
    'runSaved': false,
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
            bibNumber: action.bibNumber,
            bannerSource: action.bannerSource,
            isRunComplete: action.isRunComplete,
            dateStart: action.dateStart,
            dateEnd: action.dateEnd,
            runDeleted: false,
            runSaved: false,
        })
    },
    [types.DELETE_RUN](state, action) {
        return Object.assign({}, state, {
            runDeleted: true,
        })
    },
    [types.GET_LATEST_EVENT_EMPTY](state, action) {
        return Object.assign({}, state, {
        event: {},
        distanceWeeklyLeft: 0,
        distanceWeekly: 0,
        overallDistanceTravelled: 0,
        overallDistanceLeft: 0,
        daysLeft: 0,
        name: '',
        totalDistance: 0,
        distanceWeeklyRun: 0,
        eventID: '',
        bibNumber: '',
        bannerSource: '' ,
        isRunComplete: false,
        dateStart: new Date(),
        refresh: false,
        runDeleted: false,
        runSaved: false,
        })
    },
    [types.SAVE_RUN](state, action) {
        return Object.assign({}, state, {
            runSaved: true,
        })
    },
    [types.SAVE_RUN_TREADMILL](state, action) {
        return Object.assign({}, state, {
            runSaved: true,
        })
    },
    
    
})