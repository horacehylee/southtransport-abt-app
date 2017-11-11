import * as actions from "./actions"
import * as actionTypes from "./actionTypes"
import { combineEpics } from "redux-observable"

import { map } from 'rxjs/operator/map'
import { mergeMap } from 'rxjs/operator/mergeMap'
import { filter } from "rxjs/operator/filter"
import { delay } from "rxjs/operator/delay"
import { Observable } from "rxjs/Observable"

import { ajax } from 'rxjs/observable/dom/ajax';

import SettingsStorage from './services/SettingsStorage';
import SettingsApi from './services/SettingsApi';
import AppInstall from './../../modules/app-install/AppInstall';

import Params from './../../params';
const apiPath = Params.apiPath;

const updateSettings = (action$, _, { http }) =>
    action$.ofType(actionTypes.UPDATE_SETTINGS)
        .switchMap(action =>
            Observable.of(1)
                .flatMap(x => Observable.fromPromise(SettingsStorage.updateAndStore(action.payload.groupKey, action.payload.itemKey, action.payload.value)))
                .map(payload => actions.updateSettingsFulfilled(payload))
                .takeUntil(action$.ofType(actionTypes.UPDATE_SETTINGS_CANCELLED))
                .catch(err => Observable.of(actions.updateSettingsError(err)))
        );

const loadSettings = (action$, _) =>
    action$.ofType(actionTypes.LOAD_SETTINGS)
        .switchMap(action =>
            Observable.of(1)
                .flatMap(x => Observable.fromPromise(SettingsStorage.load()))
                .map(payload => actions.loadSettingsFulfilled(payload))
                .takeUntil(action$.ofType(actionTypes.LOAD_SETTINGS_CANCELLED))
                .catch(err => Observable.of(actions.loadSettingsError(err)))
        );

const sendTestPushNotification = (action$, _, { http }) =>
    action$.ofType(actionTypes.SEND_TEST_NOTIFICATION)
        .switchMap(action =>
            Observable.fromPromise(SettingsApi.sendTestNotification(AppInstall.getInstallId()))
                .map(payload => actions.sendTestNotificationFulfilled(payload))
                .catch(err => actions.sendTestNotificationError(err))
        // .do(response => console.log(response))
        // .catch(err => console.log('error', err))
        );

export default combineEpics(
    updateSettings,
    loadSettings,
    sendTestPushNotification,
)