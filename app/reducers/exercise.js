import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const location = createReducer({
    'prevLatLng': 0,
    'totalDistanceTravelled': 0 ,
    'previousDistanceTravelled': 0, 
    }, {
    [types.SET_LOCATION](state, action) {
        return Object.assign({}, state, {
            prevLatLng: action.latlng
        })
    },[types.UPDATE_LOCATION](state, action) {
        return Object.assign({}, state, {
            prevLatLng: action.location.latlng,
            totalDistanceTravelled: action.location.totalDistanceTravelled,
        })
    },[types.UPDATE_LOCATION_LAPSE](state, action) {
        return Object.assign({}, state, {
            prevLatLng: action.locationLapse.latlng,
            totalDistanceTravelled: action.locationLapse.totalDistanceTravelled,
            previousDistanceTravelled: action.locationLapse.previousDistanceTravelled,
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
})



export const timer = createReducer({
    'mainTimer': null,
    'mainTimerStart': null,
    'isPause': false,
    'prevTimer': null,
    }, {
    [types.UPDATE_TIMER](state, action) {
        return Object.assign({}, state, {
           mainTimer: action.mainTimer,
        })
    },[types.START_JOGGING](state, action) {
        return Object.assign({}, state, {
           mainTimerStart: action.mainTimerStart,
        })
    },[types.PAUSE_TIMER](state, action) {
        return Object.assign({}, state, {
           isPause: true,
           prevTimer: action.prevTimer,
        })
    },
})