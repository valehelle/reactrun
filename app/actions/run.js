import * as types from './types'
import realm from '../database/realm'
import { mToKM, TimeFormatter, DateNiceFormatter, miliseconds, kmToM, mileToM} from '../lib/lib'
var uuid = require('react-native-uuid')
const RNFS = require('react-native-fs')
import { Platform } from 'react-native'


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
                photo: '',
                distance: getState().location.totalDistanceTravelled,
                title: eventDetail.name,
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

export function saveTreadmill(state){
 
    return(dispatch, getState) => {
        let runID = uuid.v4()
        let eventID = getState().currentEvent.eventID
        let eventDetail = realm.objectForPrimaryKey('Event', eventID)
        let event = eventDetail.runs
        let hour = state.hour
        let minute = state.minute
        let second = state.second
        let distance = 0

        if(hour === ''){
            hour = 0
        }
        if(minute === ''){
            minute = 0
        }
        if(second === ''){
            second = 0
        }
        let time = parseInt(miliseconds(hour,minute,second))

        let unit = getState().user.unit
        if(unit === 'KILOMETER'){
            distance = kmToM(state.distance)
        }else{
            distance = mileToM(state.distance)
        }

        if(state.bannerName != 'null'){
            // create a path you want to write to
            let path = RNFS.DocumentDirectoryPath + '/' + state.bannerName
            // write the file
            RNFS.writeFile(path, state.bannerData, 'base64')
            .then((success) => {
                let runDetail = {
                        id: runID,
                        date: new Date(),
                        time: time,
                        type: 'Treadmill',
                        photo: state.bannerName,
                        distance: parseInt(distance),
                        title: eventDetail.name,
                }
                try{
                    realm.write(() => {
                        let run = realm.create('Run', runDetail);
                        event.push(run);
                    })
                    return dispatch(saveRunCompleteTreadmill({ runDetail: runDetail }))
                }catch(e){
                    console.log(e)
                    return dispatch(saveRunFailed())
                }
            })
            .catch((err) => {
                        console.log(err.message);
                        return dispatch(saveRunFailed())
            });  
        }

    }
}
function saveRunCompleteTreadmill( { runDetail } ){
    return {
        type: types.SAVE_RUN_TREADMILL,
        id: runDetail.id,
        title: runDetail.title,
    }
}

function saveRunComplete( { runDetail } ){
    return {
        type: types.SAVE_RUN,
        id: runDetail.id,
        title: runDetail.title,
    }
}
function saveRunFailed(){
    return {
        type: types.SAVE_RUN_FAILED,
    }
}

export function setRunDetailID(id,title){
    return {
        type: types.SET_RUN_DETAIL_ID,
        id: id,
        title: title,
    }
}

export function getRunDetails(){
    return(dispatch, getState) => {
        let runID = getState().runDetail.id
        let runDetail = realm.objectForPrimaryKey('Run', runID)
        let distance = runDetail.distance
        let time = TimeFormatter(runDetail.time)
        let date = DateNiceFormatter(runDetail.date)
        let pace = distance / runDetail.time
        pace = pace * 60000
        pace = pace.toFixed(2)
        let runs =  realm.objects('Run')
        let day = 0
        let type = runDetail.type
        for(let index = 0; index < runs.length; index++){
            run = runs[index]
            if(run.id != runID && run.isdeleted != true){
                day = day + 1
            }
        }
        day = day + 1
        
        
        let gps = []
        let startLat = 0
        let startLng = 0
        if(type === 'Run'){
            for(let i = 0; i < runDetail.gps.length; i++){
                let latitude = runDetail.gps[i].latitude
                let longitude = runDetail.gps[i].longitude
                let location = {latitude: latitude,longitude: longitude}
                gps.push(location)
            }
            
            startLat = runDetail.gps[0].latitude
            startLng = runDetail.gps[0].longitude
        }
        let bannerSource = 'null'
        if(runDetail.photo != 'null'){
            bannerSource = Platform.select({
                ios: () => RNFS.DocumentDirectoryPath + '/' + runDetail.photo,
                android: () => 'file://' + RNFS.DocumentDirectoryPath + '/' + runDetail.photo,
            })();
        }
        let runDetails = {
                id: runID,
                distance: distance,
                time: time,
                pace: pace,
                date: date,
                gps: gps,
                startLat: startLat,
                startLng: startLng,
                day: day,
                type: type,
                bannerSource: bannerSource,
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