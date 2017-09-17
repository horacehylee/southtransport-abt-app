import * as actions from "./actions"
import * as actionTypes from "./actionTypes"
import { combineEpics } from "redux-observable"
import { map } from 'rxjs/operator/map'
import { mergeMap } from 'rxjs/operator/mergeMap'
import { filter } from "rxjs/operator/filter"
import { delay } from "rxjs/operator/delay"
import { Observable } from "rxjs/Observable"
import { parseXML } from "./../../utils/parseXML"
import { parseJourneyTime } from "./utils/parseJourneyTime"

const POLLING_TIME = 120000

const fetchJourneyTimeEpic = (action$, _, { http }) =>
    action$.ofType(actionTypes.FETCH_JOURNEY_TIME)
        .switchMap(action =>
            http.get(`http://resource.data.one.gov.hk/td/journeytime.xml`)
                .map(response => response.xhr._response)
                .switchMap(xml =>
                    parseXML(xml)
                        .catch(err => Observable.empty())
                )
                .map(jObject => parseJourneyTime(jObject[1]))
                .map(payload => actions.fetchJourneyTimeFulfilled(payload))
                .takeUntil(action$.ofType(actionTypes.FETCH_JOURNEY_TIME_CANCELLED))
                .catch(err => Observable.of(actions.fetchJourneyTimeError(err)))
        );

const pollJourneyTimeEpic = action$ =>
    action$.ofType(actionTypes.POLL_START_JOURNEY_TIME)
        .switchMap(action =>
            Observable.timer(0, POLLING_TIME)
                // Observable.timer(0, 60000)
                // Observable.timer(0, 5000)
                .switchMap(() => Observable.of(actions.fetchJourneyTime()))
                .takeUntil(action$.ofType(actionTypes.POLL_STOP_JOURNEY_TIME))
        )

export default combineEpics(
    fetchJourneyTimeEpic,
    pollJourneyTimeEpic,
)