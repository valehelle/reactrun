import * as types from './types'
import haversine from 'haversine'
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';


export function getInitialPosition(){
    return(dispatch, getState) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let initialPosition = position.coords
                return dispatch(setInitialLocation({initialPosition})) 
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000}
        )
    }
}

export function setInitialLocation({ initialPosition }){
    return {
        type: types.SET_INITIAL_LOCATION,
        latitude: initialPosition.latitude,
        longitude: initialPosition.longitude,
    }
}

export function startTracking(){
    return(dispatch, getState) => {
        BackgroundGeolocation.configure({
            desiredAccuracy: 10,
            stationaryRadius: 20,
            distanceFilter: 10,
            locationTimeout: 30,
            debug: true,
            startOnBoot: false,
            stopOnTerminate: false,
            locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            stopOnStillActivity: false,
        });
    BackgroundGeolocation.on('location', (position) => {
      //handle your locations here
                const newLatLng = {latitude: position.latitude, longitude: position.longitude }
                const prevLatLng = getState().location.prevLatLng
                const totalDistance = getState().location.totalDistanceTravelled + calcDistance(prevLatLng,newLatLng)
                const prevDistance = getState().location.previousDistanceTravelled
                if(getState().activity.isJogging){
                    if (totalDistance - prevDistance >= 1000){
                        //Update the location,distance and also lapse.
                        const lastLapse = getState().activity.laps.length - 1
                        const prevLapseTime = getState().activity.prevLapseTime
                        const time = getState().timer.mainTimer - prevLapseTime
                        const id = getState().activity.laps.length
                        const lapse = {'time': time, 'id': id}
                        const newPrevLapseTime = prevLapseTime + time

                        return dispatch(updateLocationLapse({ 
                            latlng: newLatLng,
                            previousDistanceTravelled: totalDistance,
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
    });

    
    BackgroundGeolocation.start(() => {
      console.log('[DEBUG] BackgroundGeolocation started successfully');    
    });
    }
}

// export function startTracking(){
//     return(dispatch, getState) => {
//         //Get current location
//         //Watch the user location
//         let minimumAccuracy = 100 // metres
//         let maximumSpeed = 13
//         this.watchID = navigator.geolocation.watchPosition((position) => {
//             if(position.coords.accuracy < minimumAccuracy && position.coords.speed != null && position.coords.speed < maximumSpeed){
//                 const newLatLng = {latitude: position.coords.latitude, longitude: position.coords.longitude }
//                 const prevLatLng = getState().location.prevLatLng
//                 const totalDistance = getState().location.totalDistanceTravelled + calcDistance(prevLatLng,newLatLng)
//                 const prevDistance = getState().location.previousDistanceTravelled
//                 if(getState().activity.isJogging){
//                     if (totalDistance - prevDistance >= 1000){
//                         //Update the location,distance and also lapse.
//                         const lastLapse = getState().activity.laps.length - 1
//                         const prevLapseTime = getState().activity.prevLapseTime
//                         const time = getState().timer.mainTimer - prevLapseTime
//                         const id = getState().activity.laps.length
//                         const lapse = {'time': time, 'id': id}
//                         const newPrevLapseTime = prevLapseTime + time

//                         return dispatch(updateLocationLapse({ 
//                             latlng: newLatLng,
//                             previousDistanceTravelled: totalDistance,
//                             totalDistanceTravelled: totalDistance,
//                             laps: lapse,
//                             prevLapseTime: newPrevLapseTime,
//                         }))                  
//                     }else{
//                         //Update the location and distance.
//                         return dispatch(updateLocation({ 
//                             latlng: newLatLng,
//                             totalDistanceTravelled: totalDistance,
                            
//                         }))
//                     }
//                 }else{
//                     //Update only the location.
//                     return dispatch(setLocation({ latlng: newLatLng }))
//                 }
//             }else{
//                 console.warn('Position rejected')
//             }
//         },
//         (error) => alert(JSON.stringify(error)),    
//         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 20,}
//         )
//     }
// }


export function stopTracking(){
    BackgroundGeolocation.stop(() => {
      console.log('[DEBUG] BackgroundGeolocation started successfully');    
    });
    //navigator.geolocation.clearWatch(this.watchID)
    return {
        type: types.STOP_TRACKING,
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
    return(dispatch, getState) => {
        let prevLatLng = getState().location.prevLatLng
        if(getState().location.allLatLng.length > 0){
            return dispatch({
                type: types.RESUME_JOGGING,
                mainTimerStart: new Date,
                countTimer: '',
                prevLatLng: prevLatLng,
            })
        }else{
            return dispatch({
                type: types.START_JOGGING,
                mainTimerStart: new Date,
                countTimer: '',
                prevLatLng: prevLatLng,
            })
        }
        

    }
}


export function startTimer(){
    return(dispatch, getState) => {
        this.interval = setInterval(() => {
            const mainTimerStart = getState().timer.mainTimerStart
            const prevTimer = getState().timer.prevTimer
            const mainTimer = new Date - mainTimerStart + prevTimer
            return dispatch(updateTimer(mainTimer))


        },1000)
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

export function updateCountDownTimer({ countTimer }){
    return {
        type: types.UPDATE_COUNT_DOWN_TIMER,
        countTimer,
    }
}
export function stopCountDownTimer({ countTimer }){
    return {
        type: types.STOP_COUNT_DOWN_TIMER,
        countTimer,
    }
}


