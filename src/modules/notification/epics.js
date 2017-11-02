import * as actions from "./actions"
import * as actionTypes from "./actionTypes"
import { combineEpics } from "redux-observable"

import { map } from 'rxjs/operator/map'
import { mergeMap } from 'rxjs/operator/mergeMap'
import { filter } from "rxjs/operator/filter"
import { delay } from "rxjs/operator/delay"
import { Observable } from "rxjs/Observable"
import { parseXML } from "./../../utils/parseXML"
import { parseNotification } from "./utils/parseNotification"

import { ajax } from 'rxjs/observable/dom/ajax';

import Params from './../../params';
const apiPath = Params.apiPath;

const fetchNotification = (action$, _, { http }) =>
    action$.ofType(actionTypes.FETCH_NOTIFICATION)
        .switchMap(action =>
            ajax.get(`${apiPath}/notifications`)
                // .do(response => console.log(response.response))
                .map(response => response.response)
                .do((jObject) => console.log(jObject))
                .map(jObject => parseNotification(jObject))
                .map(payload => actions.fetchFulfilled(payload))
                .takeUntil(action$.ofType(actionTypes.FETCH_NOTIFICATION_CANCELLED))
                .catch(err => Observable.of(actions.fetchError(err)))
        );

export default combineEpics(
    fetchNotification,
)