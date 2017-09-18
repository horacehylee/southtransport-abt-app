import { Map, List } from "immutable"
import * as actionTypes from "./actionTypes"

const initialState = Map({
    loading: false,
    weatherWarnings: List([])
})

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_WEATHER_WARNING:
            return state
                .set("loading", true)
        case actionTypes.FETCH_WEATHER_WARNING_CANCELLED:
            return state
                .set("loading", false)
        case actionTypes.FETCH_WEATHER_WARNING_ERROR:
            return state
                .set("loading", false)
        case actionTypes.FETCH_WEATHER_WARNING_FULFILLED:
            return state
                .set("loading", false)
                .set("weatherWarnings", action.payload.weatherWarnings)
        default:
            return state
    }
}