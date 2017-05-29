import * as types from './types'
import realm from '../database/realm'
var uuid = require('react-native-uuid');

export function createEvent(state){
    try{
        let eventID = uuid.v4()
        realm.write(() => {
            let myEvent = realm.create('Event', {
                id: eventID,
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
            eventID:eventID, 
        }

    }catch(e){
        return {
            type: types.CREATE_EVENT_FAIL,
            eventCreated: false,
        }
    }

}


export function createEventDone(){
    return {
        type: types.CREATE_EVENT_DONE,
        eventCreated: false,
        setEventID: false,
    }
}


export function getEvents(){
    let events = realm.objects('Event').sorted('datecreated',true);
    return {
        type: types.GET_EVENT_LIST,
        events: events,
    }
}

export function getEventDetails(){

    return(dispatch, getState) => {
        let eventID = getState().event.eventID
        let eventDetails = realm.objectForPrimaryKey('Event', eventID)
        return dispatch(getEventDetail(eventDetails))
    }
}

function getEventDetail(eventDetails){
    return {
        type: types.GET_EVENT_DETAILS,
        eventDetails: eventDetails,
    }
}


export function setCurEventID(ID){
    return {
        type: types.SET_CURRENT_EVENT_ID,
        eventID: ID,
        setEventID: true,
    }
}