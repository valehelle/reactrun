import * as types from './types'
import realm from '../database/realm'
import { mToKM, TimeNiceFormatter, DateNiceFormatter } from '../lib/lib'
var uuid = require('react-native-uuid');


export function getUserDetails(){

    return(dispatch, getState) => {
        let users = realm.objects('User')
        if(users.length > 0){
            const user = users[0]
            let userDetail = {
                id: user.id,
                unit: user.unit,
                birthdate: user.birthdate,
                location: user.location,       
            }    
            return dispatch(setUserDetail({userDetail: userDetail}))
        }else{
            //User profile does not exist.Create a new one
            try{
                alert('Create new')
                let userID = uuid.v4()
                let userDetail = {
                    id: userID,
                    unit: 'KILOMETER',
                    birthdate: 'none',
                    location: 'none',       
                }
                realm.write(() => {
                    let user = realm.create('User', userDetail);
                })
                return dispatch(setUserDetailDefault({userDetail: userDetail}))
            }catch(e){
                console.log(e)
                return dispatch(setUserDetailFail())
            }
        }
    }
}
function setUserDetail({ userDetail }){
    return {
        type: types.SET_USET_DETAILS,
        userDetail
    }
}
function setUserDetailDefault({ userDetail }){
    return {
        type: types.SET_USET_DETAILS_DEFAULT,
        userDetail
    }
}
function setUserDetailFail(){
    return {
        type: types.SET_USET_DETAILS_FAIL,
    }
}