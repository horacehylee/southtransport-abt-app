import { Map, List } from "immutable"
import * as actionTypes from "./actionTypes"

const initialState = Map({
    loading: false,
    news: List([])
})

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RTHK_NEWS:
            return state
                .set("loading", true)
        case actionTypes.FETCH_RTHK_NEWS_CANCELLED:
            return state
                .set("loading", false)
        case actionTypes.FETCH_RTHK_NEWS_ERROR:
            return state
                .set("loading", false)
        case actionTypes.FETCH_RTHK_NEWS_FULFILLED:
            return state
                .set("loading", false)
                .set("news", action.payload.news)
        default:
            return state
    }
}