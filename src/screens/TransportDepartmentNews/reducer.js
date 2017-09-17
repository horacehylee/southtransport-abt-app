import { Map, List } from "immutable"
import * as actionTypes from "./actionTypes"

const initialState = Map({
    loading: false,
    messages: List([])
})

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TRANSPORT_DEPARTMENT_NEWS:
            return state
                .set("loading", true)
        case actionTypes.FETCH_TRANSPORT_DEPARTMENT_NEWS_CANCELLED:
            return state
                .set("loading", false)
        case actionTypes.FETCH_TRANSPORT_DEPARTMENT_NEWS_ERROR:
            return state
                .set("loading", false)
        case actionTypes.FETCH_TRANSPORT_DEPARTMENT_NEWS_FULFILLED:
            return state
                .set("loading", false)
                .set("messages", action.payload.messages)
        default:
            return state
    }
}