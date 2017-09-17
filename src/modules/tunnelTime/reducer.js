import { Map, List } from "immutable"
import * as actionTypes from "./actionTypes"

const initialState = Map({
    polling: false,
    loading: false,
    captureDateTime: null,
    tunnelJourneyTimes: List([]),
})

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_JOURNEY_TIME:
            return state
                .set("loading", true)

        case actionTypes.FETCH_JOURNEY_TIME_ERROR:
            return state
                .set("loading", false)

        case actionTypes.FETCH_JOURNEY_TIME_CANCELLED:
            return state
                .set("loading", false)

        case actionTypes.FETCH_JOURNEY_TIME_FULFILLED:
            return state
                .set("captureDateTime", action.payload.captureDateTime)
                .set("tunnelJourneyTimes", action.payload.tunnelJourneyTimes)
                .set("loading", false)

        case actionTypes.POLL_START_JOURNEY_TIME:
            return state.set("polling", true)

        case actionTypes.POLL_STOP_JOURNEY_TIME:
            return state.set("polling", false)

        default:
            return state
    }
}