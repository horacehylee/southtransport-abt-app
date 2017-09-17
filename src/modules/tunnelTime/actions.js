import * as actionTypes from "./actionTypes"

export const fetchJourneyTime = () => ({
    type: actionTypes.FETCH_JOURNEY_TIME,
})

export const fetchJourneyTimeCancel = () => ({
    type: actionTypes.FETCH_JOURNEY_TIME_CANCELLED,
})

export const fetchJourneyTimeFulfilled = (payload) => ({
    type: actionTypes.FETCH_JOURNEY_TIME_FULFILLED,
    payload: payload,
})

export const fetchJourneyTimeError = (err) => ({
    type: actionTypes.FETCH_JOURNEY_TIME_ERROR,
    payload: err,
})

export const pollStopJourneyTime = () => ({
    type: actionTypes.POLL_STOP_JOURNEY_TIME,
})

export const pollStartJourneyTime = () => ({
    type: actionTypes.POLL_START_JOURNEY_TIME,
})