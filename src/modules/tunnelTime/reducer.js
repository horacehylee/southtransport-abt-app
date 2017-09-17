import { Map, List } from "immutable"
import { actionTypes as mainActionTypes } from "./../../screens/Main"
import * as actionTypes from "./actionTypes"

const initialState = Map({
    loading: false,
    captureDateTime: null,
    tunnelJourneyTimes: List([]),
})

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case mainActionTypes.CHANGE_TAB:
            return state
        case actionTypes.FETCH_JOURNEY_TIME:
            return state
                .set("loading", true)
        case actionTypes.FETCH_JOURNEY_TIME_CANCEL:
            return state
                .set("loading", false)
        case actionTypes.FETCH_JOURNEY_TIME_FULFILLED:
            return state
                .set("captureDateTime", action.payload.captureDateTime)
                .set("tunnelJourneyTimes", action.payload.tunnelJourneyTimes)
                .set("loading", false)
        default:
            return state
    }
}