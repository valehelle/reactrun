import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const run = createReducer({
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
export const runDetail = createReducer({
    'id': '',
    'title': '',
    'distance': 0,
    'pace': 0,
    'time': Date.now(),
    'date': Date.now(),
    'gps': [],
    'startLat': 37.78825,
    'startLng': -122.4324,
    'day': 0,
    'type': '',
    'bannerSource': '',
    'goToFinish': false,
    }, {
    [types.SET_RUN_DETAIL_ID](state, action) {
        return Object.assign({}, state, {
            id: action.id,
            title: action.title,
        })
    },
    [types.SAVE_RUN](state, action) {
        return Object.assign({}, state, {
            id: action.id,
            title: action.title,
        })
    },
    [types.SAVE_RUN_TREADMILL](state, action) {
        return Object.assign({}, state, {
            id: action.id,
            title: action.title,
            goToFinish: true,
        })
    },
    [types.GET_RUN_DETAIL](state, action) {
        return Object.assign({}, state, {
            id: action.runDetails.id,
            distance: action.runDetails.distance,
            time: action.runDetails.time,
            pace: action.runDetails.pace,
            date: action.runDetails.date,
            gps: action.runDetails.gps,
            startLat: action.runDetails.startLat,
            startLng: action.runDetails.startLng,
            day: action.runDetails.day,
            type: action.runDetails.type,
            bannerSource: action.runDetails.bannerSource,
            goToFinish: false,
        })
    },

})
