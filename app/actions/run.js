import * as types from './types'
import realm from '../database/realm'
var uuid = require('react-native-uuid');


export function saveRun(){

    return(dispatch, getState) => {
        let runID = uuid.v4()
        let eventID = getState().event.eventID
        let eventDetail = realm.objectForPrimaryKey('Event', eventID)

        let event = eventDetail.runs
        realm.write(() => {
            let run = realm.create('Run', {
                id: runID,
                date: new Date(),
                time: getState().timer.mainTimer,
                type: 'Run',
                distance: getState().location.totalDistanceTravelled,
            });
            let distanceTravelled = eventDetail.distanceTravelled + getState().location.totalDistanceTravelled
            realm.create('Event',{id: eventID,distanceTravelled: distanceTravelled},true)


            event.push(run);
        })

        return dispatch(saveRunComplete())
    }
}

function saveRunComplete(){
    return {
        type: types.SAVE_RUN,
    }
}

