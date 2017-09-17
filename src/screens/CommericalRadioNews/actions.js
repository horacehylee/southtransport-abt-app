import * as actionTypes from "./actionTypes"

export const fetchNews = () => ({
    type: actionTypes.FETCH_COMMERICAL_RADIO_NEWS,
})

export const fetchNewsCancel = () => ({
    type: actionTypes.FETCH_COMMERICAL_RADIO_NEWS_CANCELLED,
})

export const fetchNewsFulfilled = (payload) => ({
    type: actionTypes.FETCH_COMMERICAL_RADIO_NEWS_FULFILLED,
    payload: payload,
})

export const fetchNewsError = (err) => ({
    type: actionTypes.FETCH_COMMERICAL_RADIO_NEWS_ERROR,
    payload: err,
})