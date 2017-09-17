import * as actionTypes from "./actionTypes"
import { Map } from "immutable"

const initState = Map({
    tabIndex: 0,
})

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_TAB:
            return state.set("tabIndex", action.currTab)
        default:
            return state
    }
}

export default reducer