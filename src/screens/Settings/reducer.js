import { Map, List, fromJS } from "immutable"
import * as actionTypes from "./actionTypes"

import Params from './../../params';

const initialState = fromJS({
    loading: false,
    settingsOptions: {
        notification: {
            title: '通知',
            on: {
                title: '開關',
            },
            sound: {
                title: '聲音',
            },
        }
    },
    settings: {...Params.defaultSettings}
})

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_SETTINGS:
            return state
                .set("loading", true)
        case actionTypes.LOAD_SETTINGS_FULFILLED:
            console.log('action.payload', action.payload)
            return state
                .set('loading', false)
                .set('settings', fromJS(action.payload))
        case actionTypes.UPDATE_SETTINGS:
            return state
                .set("loading", true)
        case actionTypes.UPDATE_SETTINGS_CANCELLED:
            return state
                .set("loading", false)
        case actionTypes.UPDATE_SETTINGS_ERROR:
            return state
                .set("loading", false)
        case actionTypes.UPDATE_SETTINGS_FULFILLED:
            return state
                .set("loading", false)
                .set('settings', fromJS(action.payload))
        default:
            return state
    }
}