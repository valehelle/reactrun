import * as types from './types'
import realm from '../database/realm'
import { getToday, daysLeft, mToKM, mToMile, kmToM, mileToM, getWeekLeft, getDayWeekFirst, getDayWeekLast, daysBetween } from '../lib/lib'
const uuid = require('react-native-uuid');
const RNFS = require('react-native-fs')
import { Platform } from 'react-native';

export function createEvent(state){
    return(dispatch, getState) => {
        if(state.name != '' && state.distance != '' && state.distance > 0){
            
                if(state.bannerName != 'null'){
                    // create a path you want to write to
                    let path = RNFS.DocumentDirectoryPath + '/' + state.bannerName
                    // write the file
                    RNFS.writeFile(path, state.bannerData, 'base64')
                    .then((success) => {
                        const eventID = createEventRealm(state,getState,dispatch);
                        return dispatch(createEventSuccess({
                            eventID: eventID, 
                        }))
                    })
                    .catch((err) => {
                        console.log(err.message);
                        return dispatch(createEventFail())
                    });                    
                }else{
                    const eventID = createEventRealm(state,getState,dispatch);
                    return dispatch(createEventSuccess({
                        eventID: eventID, 
                    }))
                }

        }else{
            return dispatch(createEventFail())
        }
    }

}

export function createEventRealm(state,getState,dispatch){
    let eventID = uuid.v4()
    try{
        let unit = getState().user.unit
        let distance = state.distance
        if(unit === 'KILOMETER'){
            distance = kmToM(parseFloat(state.distance))
        }else{
            distance = mileToM(parseFloat(state.distance))
        }
        realm.write(() => {
                let myEvent = realm.create('Event', {
                id: eventID,
                name: state.name,
                datestart: state.sdate,
                dateend: state.edate,
                distance: parseInt(distance),
                weeklyrun: parseInt(state.weeklyrun),
                datecreated: new Date(),
                distanceTravelled: 0,
                bibNumber: state.bibNumber,
                bannerSrc: state.bannerName,
                runs: [],
            });
        })
    }catch(e){
        console.log(e)
        return dispatch(createEventFail())
    }
    return eventID
}

export function createEventSuccess({ eventID }){
    return {
        type: types.CREATE_EVENT,
        eventCreated: true,
        eventID: eventID, 
    }   
}

export function createEventFail(){
    return {
        type: types.CREATE_EVENT_FAIL,
        eventCreated: false,
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
    let events = realm.objects('Event').filtered('isdeleted = $0',false).sorted('datecreated',true);
    return {
        type: types.GET_EVENT_LIST,
        events: events,
    }
}

export function getLatestEvent(){
    let latestEvent = realm.objects('Event').filtered('isdeleted = $0',false).sorted('datecreated',true)[0]
    try{
        let eventID = latestEvent.id
        let days = daysLeft(latestEvent.dateend)
        let allruns = latestEvent.runs.filtered('isdeleted = $0',false).sorted('date',true);
        let overallDistanceTravelled = 0
        if(allruns.length > 0){
            for(let i = 0;i<allruns.length;i++){
                let run = allruns[i]
                overallDistanceTravelled = overallDistanceTravelled + run.distance
            }
        }
        let overallDistanceLeft = latestEvent.distance - overallDistanceTravelled
        let isRunComplete = false
        overallDistanceLeft = overallDistanceLeft.toFixed(2)
        if(overallDistanceLeft < 0){
            overallDistanceLeft = 0
            isRunComplete = true
        }
        let totalDistance = latestEvent.distance

        let name = latestEvent.name
        let bibNumber = latestEvent.bibNumber
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
        //If android, append file:// at the front of the file path
        let bannerSource = 'null'
        if(latestEvent.bannerSrc != 'null'){
            bannerSource = Platform.select({
                ios: () => RNFS.DocumentDirectoryPath + '/' + latestEvent.bannerSrc,
                android: () => 'file://' + RNFS.DocumentDirectoryPath + '/' + latestEvent.bannerSrc,
            })();
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
            bibNumber: bibNumber,
            bannerSource:  bannerSource,
            isRunComplete: isRunComplete,
            dateStart: latestEvent.datestart,
            dateEnd: latestEvent.dateend,
        }
    }catch(e){
        return {
            type: types.GET_LATEST_EVENT_EMPTY,
        }
    }
}

export function deleteRun(state){
    let runID = state.runID
    realm.write(() => {
        let run = realm.objectForPrimaryKey('Run', runID)
        run.isdeleted = true
    });
    return {
        type: types.DELETE_RUN,
    }
}

export function deleteEvent(state){
    let eventID = state.eventID
    realm.write(() => {
        let run = realm.objectForPrimaryKey('Event', eventID)
        run.isdeleted = true
    });
    return {
        type: types.DELETE_EVENT,
    }
}

export function getEventDetails(){

    return(dispatch, getState) => {
        let eventID = getState().event.eventID
        let currentEvent = realm.objectForPrimaryKey('Event', eventID)
        try{
            let eventID = currentEvent.id
            let days = daysLeft(currentEvent.dateend)
            let allruns = currentEvent.runs.filtered('isdeleted = $0',false).sorted('date',true);
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
            let overallDistanceLeft = currentEvent.distance - overallDistanceTravelled
            let isRunComplete = false
            overallDistanceLeft = overallDistanceLeft.toFixed(2)
            if(overallDistanceLeft < 0){
                overallDistanceLeft = 0
                isRunComplete = true
            }
            
            let totalDistance = currentEvent.distance

            let name = currentEvent.name
            let bibNumber = currentEvent.bibNumber
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

            let distanceWeeklyLeft = distanceWeeklyLeft =  distanceWeekly - distanceWeeklyRun
            if(distanceWeeklyLeft < 0){
                distanceWeeklyLeft = 0
            }
            let distanceGoal = (distanceWeekly / 2).toFixed(2)
            let bannerSource = 'null'
            if(currentEvent.bannerSrc != 'null'){
                bannerSource = Platform.select({
                    ios: () => RNFS.DocumentDirectoryPath + '/' + currentEvent.bannerSrc,
                    android: () => 'file://' + RNFS.DocumentDirectoryPath + '/' + currentEvent.bannerSrc,
                })();
            }
            let dateS = currentEvent.datestart
            let dateE = currentEvent.dateend
            return dispatch({
                type: types.GET_CURRENT_EVENT,
                eventID: eventID,
                daysLeft: days,
                overallDistanceTravelled: overallDistanceTravelled,
                overallDistanceLeft: overallDistanceLeft,
                name: name,
                totalDistance: totalDistance,
                runs: runs,
                dateStart: dateS,
                dateEnd: dateE,
                distanceWeeklyLeft: distanceWeeklyLeft,
                distanceWeekly: distanceWeekly,
                distanceWeeklyRun: distanceWeeklyRun,
                distanceGoal: distanceGoal,
                bibNumber: bibNumber,
                bannerSource: bannerSource,
                isRunComplete: isRunComplete,
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
