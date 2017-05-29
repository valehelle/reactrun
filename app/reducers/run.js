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