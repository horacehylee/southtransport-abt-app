import * as actionTypes from "./actionTypes"

export const loadSettings = () => ({
    type: actionTypes.LOAD_SETTINGS,
})

export const loadSettingsFulfilled = (payload) => ({
    type: actionTypes.LOAD_SETTINGS_FULFILLED,
    payload: payload,
})

export const loadSettingsCancelled = () => ({
    type: actionTypes.LOAD_SETTINGS_CANCELLED,
})

export const loadSettingsError = (err) => ({
    type: actionTypes.LOAD_SETTINGS_ERROR,
    payload: err,
})

export const updateSettings = (groupKey, itemKey, value) => ({
    type: actionTypes.UPDATE_SETTINGS,
    payload: {
        groupKey: groupKey,
        itemKey: itemKey,
        value: value
    }
})

export const updateSettingsCancelled = () => ({
    type: actionTypes.UPDATE_SETTINGS_CANCELLED,
})

export const updateSettingsFulfilled = (payload) => ({
    type: actionTypes.UPDATE_SETTINGS_FULFILLED,
    payload: payload,
})

export const updateSettingsError = (err) => ({
    type: actionTypes.UPDATE_SETTINGS_ERROR,
    payload: err,
})

export const sendTestNotification = () => ({
    type: actionTypes.SEND_TEST_NOTIFICATION,
})

export const sendTestNotificationFulfilled = (payload) => ({
    type: actionTypes.SEND_TEST_NOTIFICATION_FULFILLED,
    payload: payload,
})

export const sendTestNotificationError = (err) => ({
    type: actionTypes.SEND_TEST_NOTIFICATION_ERROR,
    payload: err
})