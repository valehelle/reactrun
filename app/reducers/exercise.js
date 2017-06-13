import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const location = createReducer({
    'prevLatLng': 0,
    'totalDistanceTravelled': 0 ,
    'previousDistanceTravelled': 0,
    'allLatLng': [],
    }, {
    [types.SET_LOCATION](state, action) {
        return Object.assign({}, state, {
            prevLatLng: action.latlng
        })
    },[types.UPDATE_LOCATION](state, action) {
        return Object.assign({}, state, {
            prevLatLng: action.location.latlng,
            totalDistanceTravelled: action.location.totalDistanceTravelled,
            allLatLng:  [...state.allLatLng, action.location.latlng],
        })
    },[types.UPDATE_LOCATION_LAPSE](state, action) {
        return Object.assign({}, state, {
            prevLatLng: action.locationLapse.latlng,
            totalDistanceTravelled: action.locationLapse.totalDistanceTravelled,
            previousDistanceTravelled: action.locationLapse.previousDistanceTravelled,
            allLatLng:  [...state.allLatLng, action.locationLapse.latlng],
        })
    },
    [types.STOP_TRACKING](state, action) {
        return Object.assign({}, state, {
            prevLatLng: 0,
            totalDistanceTravelled: 0,
            previousDistanceTravelled: 0,
        })
    },
    


})

export const activity = createReducer({
    'isJogging': false,
    'isActive': false,
    'laps': [],
    'prevLapseTime': 0
    }, {
    [types.START_JOGGING](state, action) {
        return Object.assign({}, state, {
            isJogging: true,
            isActive: true,
        })
    },
    [types.STOP_JOGGING](state, action) {
        return Object.assign({}, state, {
            isJogging: false,
        })
    },[types.UPDATE_LOCATION_LAPSE](state, action) {
        return Object.assign({}, state, {
            laps: [...state.laps, action.locationLapse.laps],
            prevLapseTime: action.locationLapse.prevLapseTime, 
        })
    },
    [types.STOP_TRACKING](state, action) {
        return Object.assign({}, state, {
            'isJogging': false,
            'isActive': false,
            'laps': [],
            'prevLapseTime': 0
        })
    },
})



export const timer = createReducer({
    'mainTimer': null,
    'mainTimerStart': null,
    'isPause': false,
    'prevTimer': null,
    'countTimer': 5,
    'isCountDown': false,
    }, {
    [types.UPDATE_TIMER](state, action) {
        return Object.assign({}, state, {
           mainTimer: action.mainTimer,
        })
    },[types.START_JOGGING](state, action) {
        return Object.assign({}, state, {
           mainTimerStart: action.mainTimerStart,
           countTimer: action.countTimer,
           isCountDown: false,
        })
    },[types.PAUSE_TIMER](state, action) {
        return Object.assign({}, state, {
           isPause: true,
           prevTimer: action.prevTimer,
        })
    },
    [types.STOP_TRACKING](state, action) {
        return Object.assign({}, state, {
            'mainTimer': null,
            'mainTimerStart': null,
            'isPause': false,
            'prevTimer': null,
            'countTimer': 5,
            'isCountDown': false,
        })
    },
    [types.UPDATE_COUNT_DOWN_TIMER](state, action) {
        return Object.assign({}, state, {
            'countTimer': action.countTimer,
            'isCountDown': true,
        })
    },
    [types.STOP_COUNT_DOWN_TIMER](state, action) {
        return Object.assign({}, state, {
            'countTimer': action.countTimer,
            'isCountDown': false,
        })
    },
})
