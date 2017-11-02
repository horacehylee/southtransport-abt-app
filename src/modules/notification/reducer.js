import { Map, List } from "immutable"
import * as actionTypes from "./actionTypes"

const initialState = Map({
    loading: false,
    notifications: List([])
})

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_NOTIFICATION:
            return state
                .set("loading", true)
        case actionTypes.FETCH_NOTIFICATION_CANCELLED:
            return state
                .set("loading", false)
        case actionTypes.FETCH_NOTIFICATION_ERROR:
            return state
                .set("loading", false)
        case actionTypes.FETCH_NOTIFICATION_FULFILLED:
            return state
                .set("loading", false)
                .set("notifications", action.payload.notifications)
        default:
            return state
    }
}