import * as actionTypes from "./actionTypes"

export const fetch = () => ({
    type: actionTypes.FETCH_NOTIFICATION,
})

export const fetchCancelled = () => ({
    type: actionTypes.FETCH_NOTIFICATION_CANCELLED,
})

export const fetchFulfilled = (payload) => ({
    type: actionTypes.FETCH_NOTIFICATION_FULFILLED,
    payload: payload,
})

export const fetchError = (err) => ({
    type: actionTypes.FETCH_NOTIFICATION_ERROR,
    payload: err,
})