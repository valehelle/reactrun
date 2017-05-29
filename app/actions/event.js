import * as types from './types'
import realm from '../database/realm'

export function createEvent(state){
    try{
        realm.write(() => {
            let myEvent = realm.create('Event', {
                name: state.name,
                datestart: state.sdate,
                dateend: state.edate,
                distance: parseInt(state.distance),
                weeklyrun: parseInt(state.weeklyrun),
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
        alert('Something went wrong when trying to create a new event.')
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
    let events = realm.objects('Event');
    return {
        type: types.GET_EVENT_LIST,
        events: events,
    }
}