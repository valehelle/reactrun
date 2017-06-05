import * as types from './types'
import realm from '../database/realm'
import { getToday, daysLeft, mToKM, getWeekLeft, getDayWeekFirst, getDayWeekLast, daysBetween } from '../lib/lib'
var uuid = require('react-native-uuid');

export function createEvent(state){
    if(state.name != '' && state.distance != '' && state.distance > 0){
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
    }else{
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
        let distanceWeekly = 0
        if( weekLeft > 0){
            distanceWeekly = totalDistance / weekLeft
        }
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
        if(distanceWeeklyLeft < 0){
            distanceWeeklyLeft = 0
        }
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
        return {
            type: types.GET_LATEST_EVENT_EMPTY,
        }
    }
}


export function getEventDetails(){

    return(dispatch, getState) => {
        let eventID = getState().event.eventID
        let currentEvent = realm.objectForPrimaryKey('Event', eventID)
        try{
            let eventID = currentEvent.id
            let days = daysLeft(currentEvent.dateend)
            let allruns = currentEvent.runs.sorted('date',true);
            let overallDistanceTravelled = 0
            let runs = []
            if(allruns.length > 0){
                for(let i = 0;i<allruns.length;i++){
                    let run = allruns[i]
                    let pace = run.distance / run.time
                    pace = pace * 60000
                    pace = pace.toFixed(0)
                    run.pace = pace
                    runs.push(run)
                    overallDistanceTravelled = overallDistanceTravelled + run.distance
                }
            }
            overallDistanceTravelled = mToKM(overallDistanceTravelled)
            let overallDistanceLeft = currentEvent.distance - overallDistanceTravelled
            overallDistanceLeft = overallDistanceLeft.toFixed(2)
            let totalDistance = currentEvent.distance

            let name = currentEvent.name
            let id = currentEvent.id
            let weekLeft = getWeekLeft(days)
            let distanceWeekly = 0
            if( weekLeft > 0){
                distanceWeekly = totalDistance / weekLeft
            }
            distanceWeekly = Math.round(distanceWeekly * 100) / 100
            let weekruns = currentEvent.runs.filtered('date >= $0 AND date <= $1',getDayWeekFirst(),getDayWeekLast())
            let distanceWeeklyRun = 0
            if(weekruns.length > 0){
                for(let i = 0;i<weekruns.length;i++){
                    let run = weekruns[i]
                    distanceWeeklyRun = distanceWeeklyRun + run.distance
                }
            }

            distanceWeeklyRun = mToKM(distanceWeeklyRun)
            let distanceWeeklyLeft = distanceWeeklyLeft =  distanceWeekly - distanceWeeklyRun
            if(distanceWeeklyLeft < 0){
                distanceWeeklyLeft = 0
            }
            let distanceGoal = (distanceWeekly / 3).toFixed(2)

            return dispatch({
                type: types.GET_CURRENT_EVENT,
                event: currentEvent,
                eventID: eventID,
                daysLeft: days,
                overallDistanceTravelled: overallDistanceTravelled,
                overallDistanceLeft: overallDistanceLeft,
                name: name,
                totalDistance: totalDistance,
                runs: runs,
                dateStart: currentEvent.datestart,
                dateEnd: currentEvent.dateend,
                distanceWeeklyLeft: distanceWeeklyLeft,
                distanceWeekly: distanceWeekly,
                distanceWeeklyRun: distanceWeeklyRun,
                distanceGoal: distanceGoal,
            })

        }catch(e){
            console.log(e)
            return dispatch({
                type: types.GET_CURRENT_EVENT_FAIL,
            })
        }
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
