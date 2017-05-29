import * as types from './types'
import realm from '../database/realm'
var uuid = require('react-native-uuid');

export function createEvent(state){
    try{
        realm.write(() => {
            let myEvent = realm.create('Event', {
                id: uuid.v4(),
                name: state.name,
                datestart: state.sdate,
                dateend: state.edate,
                distance: parseInt(state.distance),
                weeklyrun: parseInt(state.weeklyrun),
                datecreated: new Date(),
                runs: [],
            });

    // let runs = myEvent.runs
    //  let run = realm.create('Run', {
    //     date: new Date(),
    //     time: new Date(),
    //     type: 'ccccc',
    //     distance: 12,
    //   });
    //   runs.push(run);
    //   runs.push(run);
        })

        return {
            type: types.CREATE_EVENT,
            eventCreated: true,
        }

    }catch(e){
        return {
            type: types.CREATE_EVENT_FAIL,
            eventCreated: false,
        }
    }

}


export function createEventDone(state){
    return {
        type: types.CREATE_EVENT_DONE,
        eventCreated: false,
    }
}


export function getEvents(){
    let events = realm.objects('Event').sorted('datecreated',true);
    return {
        type: types.GET_EVENT_LIST,
        events: events,
    }
}