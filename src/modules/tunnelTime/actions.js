import * as actionTypes from "./actionTypes"

export const fetchJourneyTime = () => ({
    type: actionTypes.FETCH_JOURNEY_TIME,
})

export const fetchJourneyTimeCancel = () => ({
    type: actionTypes.FETCH_JOURNEY_TIME_CANCEL,
})

export const fetchJourneyTimeFulfilled = (payload) => ({
    type: actionTypes.FETCH_JOURNEY_TIME_FULFILLED,
    payload: payload,
})