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
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        )
    }
    
}


export function setInitialLocation({ initialPosition }){
    return {
        type: types.SET_INITIAL_LOCATION,
        initialPosition,
    }
}

export function startTracking(){
    return(dispatch, getState) => {

    BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.accuracy.HIGH,
            stationaryRadius: 10,
            distanceFilter: 10,
            locationTimeout: 30,
            debug: true,
            startOnBoot: false,
            stopOnTerminate: false,
            interval: 1000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            stopOnStillActivity: false,
            saveBatteryOnBackground	: false,
            locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
    });
    
    BackgroundGeolocation.on('location', (position) => {
      //handle your locations here
                const newLatLng = {latitude: position.latitude, longitude: position.longitude, accuracy: position.accuracy }
                const accuracy = position.accuracy
                const prevLatLng = getState().location.prevLatLng
                const totalDistance = getState().location.totalDistanceTravelled + calcDistance(prevLatLng,newLatLng)
                if(getState().activity.isJogging){
                        //Update the location and distance.
                        return dispatch(updateLocation({ 
                            latlng: newLatLng,
                            totalDistanceTravelled: totalDistance,
                            accuracy: accuracy,
                        }))
                
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

export function stopTracking(){
    BackgroundGeolocation.stop(() => {
      console.log('[DEBUG] BackgroundGeolocation stop successfully');    
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


