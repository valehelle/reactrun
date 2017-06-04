import * as types from './types'
import realm from '../database/realm'
import { mToKM, TimeNiceFormatter } from '../lib/lib'
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
                event.push(run);
            })
            return dispatch(saveRunComplete({ runDetail: runDetail }))
        }catch(e){
            return dispatch(saveRunComplete())
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
        let pace = runDetail.distance / runDetail.time
        pace = pace * 60000
        pace = pace.toFixed(0)
        let runDetails = {
                id: runID,
                distance: distance,
                time: time,
                pace: pace,
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