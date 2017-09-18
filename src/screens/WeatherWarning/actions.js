import * as actionTypes from "./actionTypes"

export const fetchWeatherWarning = () => ({
    type: actionTypes.FETCH_WEATHER_WARNING,
})

export const fetchWeatherWarningCancel = () => ({
    type: actionTypes.FETCH_WEATHER_WARNING_CANCELLED,
})

export const fetchWeatherWarningFulfilled = (payload) => ({
    type: actionTypes.FETCH_WEATHER_WARNING_FULFILLED,
    payload: payload,
})

export const fetchWeatherWarningError = (err) => ({
    type: actionTypes.FETCH_WEATHER_WARNING_ERROR,
    payload: err,
})