import * as actionTypes from "./actionTypes"
import { Map } from "immutable"

const initState = Map({
    prevTab: null,
    currTab: 0,
})

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_TAB:
            return state
                .set("prevTab", action.payload.prevTab)
                .set("currTab", action.payload.currTab)
        default:
            return state
    }
}

export default reducer