import * as types from './types'
import haversine from 'haversine'

export function startTracking(){
    return(dispatch, getState) => {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const newLatLng = {latitude: position.coords.latitude, longitude: position.coords.longitude }
            const prevLatLng = getState().location.prevLatLng
            const totalDistance = getState().location.totalDistanceTravelled + calcDistance(prevLatLng,newLatLng)
            const prevDistance = getState().location.totalDistanceTravelled
            if(getState().activity.isJogging){
                if (totalDistance - prevDistance >= 100){
                    //Update the location,distance and also lapse.
                    const lastLapse = getState().activity.laps.length - 1
                    const prevLapseTime = getState().activity.prevLapseTime
                    const time = getState().timer.mainTimer - prevLapseTime
                    const id = getState().activity.laps.length
                    const lapse = {'time': time, 'id': id}
                    const newPrevLapseTime = prevLapseTime + time

                    return dispatch(updateLocationLapse({ 
                        latlng: newLatLng,
                        previousDistanceTravelled: prevDistance,
                        totalDistanceTravelled: totalDistance,
                        laps: lapse,
                        prevLapseTime: newPrevLapseTime,
                    }))                  
                }else{
                    //Update the location and distance.
                    return dispatch(updateLocation({ 
                        latlng: newLatLng,
                        totalDistanceTravelled: totalDistance,
                    }))
                }
            }else{
                //Update only the location.
                return dispatch(setLocation({ latlng: newLatLng }))
            }
        },
        (error) => alert(JSON.stringify(error)),    
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }
}

export function setLocation( { latlng } ){
    return {
        type: types.SET_LOCATION,
        latlng,
    }
}
export function updateLocation(location){
    return {
        type: types.UPDATE_LOCATION,
        location,
    }
}

export function updateLocationLapse(locationLapse){
    return {
        type: types.UPDATE_LOCATION_LAPSE,
        locationLapse,
    }
}

function calcDistance(prevLatLng,newLatLng) {
   return (haversine(prevLatLng, newLatLng, {unit: 'meter'}) || 0)
}


export function startJogging(){ 
    return {
        type: types.START_JOGGING,
        mainTimerStart: new Date,
    }
}
export function startTimer(){
    return(dispatch, getState) => {
        this.interval = setInterval(() => {
            const mainTimerStart = getState().timer.mainTimerStart
            const prevTimer = getState().timer.prevTimer
            const mainTimer = new Date - mainTimerStart + prevTimer
            return dispatch(updateTimer(mainTimer))


        },30)
    }
}
function updateTimer(mainTimer){
    return {
        type: types.UPDATE_TIMER,
        mainTimer: mainTimer,
    }
}


export function pauseTimer(){
    clearInterval(this.interval)
    return(dispatch, getState) => {
        const prevTimer = getState().timer.mainTimer
        return dispatch(setPauseTimer({prevTimer: prevTimer}))
    }

}

export function setPauseTimer({ prevTimer }){
    return {
        type: types.PAUSE_TIMER,
        prevTimer,
    }
}

export function stopTimer(){
    clearInterval(this.interval)
    return {
        type: types.STOP_TIMER,
    }
}
export function stopJogging(){
    return(dispatch, getState) => {
        return dispatch({
            type: types.STOP_JOGGING,
        })   
    }

}



