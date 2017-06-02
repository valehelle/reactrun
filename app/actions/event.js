import * as types from './types'
import realm from '../database/realm'
import { getToday, daysLeft, mToKM, getWeekLeft, getDayWeekFirst, getDayWeekLast } from '../lib/lib'
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
                distanceTravelled: 0,
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
        alert(e + state.sdate + '}} ' + state.edate)
        return {
            type: types.CREATE_EVENT_FAIL,
            eventCreated: false,
        }
    }

}


export function redirectEventDetailsDone(){
    return {
        type: types.REDIRECT_EVENT_DETAILS_DONE,
        eventCreated: false,
        goToDetail: false,
    }
}


export function getEvents(){
    let events = realm.objects('Event').sorted('datecreated',true);
    return {
        type: types.GET_EVENT_LIST,
        events: events,
    }
}

export function getLatestEvent(){
    let latestEvent = realm.objects('Event').sorted('datecreated',true)[0]
    try{
        let eventID = latestEvent.id
        let days = daysLeft(latestEvent.dateend)
        let allruns = latestEvent.runs
        let overallDistanceTravelled = 0
        if(allruns.length > 0){
            for(let i = 0;i<allruns.length;i++){
                let run = allruns[i]
                overallDistanceTravelled = overallDistanceTravelled + run.distance
            }
        }
        overallDistanceTravelled = mToKM(overallDistanceTravelled)
        let overallDistanceLeft = latestEvent.distance - overallDistanceTravelled
        let totalDistance = latestEvent.distance

        let name = latestEvent.name
        let id = latestEvent.id
        let weekLeft = getWeekLeft(days)
        let distanceWeekly = totalDistance / weekLeft
        distanceWeekly = Math.round(distanceWeekly * 100) / 100
        let weekruns = latestEvent.runs.filtered('date >= $0 AND date <= $1',getDayWeekFirst(),getDayWeekLast())
        let distanceWeeklyRun = 0
        if(weekruns.length > 0){
            for(let i = 0;i<weekruns.length;i++){
                let run = weekruns[i]
                distanceWeeklyRun = distanceWeeklyRun + run.distance
            }
        }
        distanceWeeklyRun = mToKM(distanceWeeklyRun)
        let distanceWeeklyLeft = distanceWeekly - distanceWeeklyRun
        distanceWeeklyLeft = Math.round(distanceWeeklyLeft * 100) / 100

        return {
            type: types.GET_LATEST_EVENT,
            event: latestEvent,
            eventID: eventID,
            daysLeft: days,
            overallDistanceTravelled: overallDistanceTravelled,
            overallDistanceLeft: overallDistanceLeft,
            name: name,
            totalDistance: totalDistance,
            distanceWeeklyLeft: distanceWeeklyLeft,
            distanceWeekly: distanceWeekly,
            distanceWeeklyRun: distanceWeeklyRun,
        }
    }catch(e){
        alert(e)
        return {
            type: types.GET_LATEST_EVENT_EMPTY,
        }
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
    }
}

export function goToDetail(){
    return {
        type: types.GO_TO_DETAIL,
        goToDetail: true,
    }
}
