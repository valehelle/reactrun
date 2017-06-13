import * as types from './types'
import realm from '../database/realm'
import { mToKM, TimeNiceFormatter, DateNiceFormatter } from '../lib/lib'
var uuid = require('react-native-uuid');


export function saveRun(){

    return(dispatch, getState) => {
        let runID = uuid.v4()
        let eventID = getState().event.eventID
        let eventDetail = realm.objectForPrimaryKey('Event', eventID)

        let event = eventDetail.runs
        let runDetail = {
                id: runID,
                date: new Date(),
                time: getState().timer.mainTimer,
                type: 'Run',
                distance: getState().location.totalDistanceTravelled,        
        }
        try{
            realm.write(() => {
                let run = realm.create('Run', runDetail);
                for(let i = 0; i < getState().location.allLatLng.length; i++){
                    let latlng = getState().location.allLatLng[i]
                    let gps = realm.create('Gps', latlng)
                    run.gps.push(latlng)
                }
                event.push(run);
            })
            return dispatch(saveRunComplete({ runDetail: runDetail }))
        }catch(e){
            console.log(e)
            return dispatch(saveRunFailed())
        }
    }
}

function saveRunComplete( { runDetail } ){
    return {
        type: types.SAVE_RUN,
        id: runDetail.id
    }
}
function saveRunFailed(){
    return {
        type: types.SAVE_RUN_FAILED,
    }
}

export function setRunDetailID(id){
    return {
        type: types.SET_RUN_DETAIL_ID,
        id: id,
    }
}

export function getRunDetails(){
    return(dispatch, getState) => {
        let runID = getState().runDetail.id
        let runDetail = realm.objectForPrimaryKey('Run', runID)
        let distance = mToKM(runDetail.distance)
        let time = TimeNiceFormatter(runDetail.time)
        let date = DateNiceFormatter(runDetail.date)
        let pace = runDetail.distance / runDetail.time
        pace = pace * 60000
        pace = pace.toFixed(0)
        
        let gps = []
        for(let i = 0; i < runDetail.gps.length; i++){
            let latitude = runDetail.gps[i].latitude
            let longitude = runDetail.gps[i].longitude
            let location = {latitude: latitude,longitude: longitude}
            gps.push(location)
        }
        let startLat = runDetail.gps[0].latitude
        let startLng = runDetail.gps[0].longitude
        let runDetails = {
                id: runID,
                distance: distance,
                time: time,
                pace: pace,
                date: date,
                gps: gps,
                startLat: startLat,
                startLng: startLng,
        }
        return dispatch(getDetail(
            {
                runDetails: runDetails,
            }
        ))

    }
}
function getDetail({ runDetails } ){
    return {
        type: types.GET_RUN_DETAIL,
        runDetails: runDetails,
    }
}