import * as types from './types'

export function getPromoEvents(){
    return(dispatch, getState) => {
        fetch('https://valehelle.github.io/venv/promotion.json')
            .then((response) => response.json())
            .then((events) => {
                dispatch(setPromoEvents(events))
            })
            .catch((error) => {
                console.error(error)
                dispatch(getPromoEventsFail())
            });
    }

}
export function setPromoEvents({ events }){
    return {
        type: types.SET_PROMO_EVENTS,
        events,
    }
}

export function getPromoEventsFail(){
    return {
        type: types.GET_PROMO_EVENTS_FAIL,
    }
}