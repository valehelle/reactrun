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
    'distance': 0,
    'pace': 0,
    'time': Date.now(),
    'date': Date.now(),
    }, {
    [types.SET_RUN_DETAIL_ID](state, action) {
        return Object.assign({}, state, {
            id: action.id
        })
    },
    [types.SAVE_RUN](state, action) {
        return Object.assign({}, state, {
            id: action.id
        })
    },
    [types.GET_RUN_DETAIL](state, action) {
        return Object.assign({}, state, {
            id: action.runDetails.id,
            distance: action.runDetails.distance,
            time: action.runDetails.time,
            pace: action.runDetails.pace,
            date: action.runDetails.date,
        })
    },

})
