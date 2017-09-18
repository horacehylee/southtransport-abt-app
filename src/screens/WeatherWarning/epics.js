import * as actions from "./actions"
import * as actionTypes from "./actionTypes"
import { combineEpics } from "redux-observable"

import { map } from 'rxjs/operator/map'
import { mergeMap } from 'rxjs/operator/mergeMap'
import { filter } from "rxjs/operator/filter"
import { delay } from "rxjs/operator/delay"
import { Observable } from "rxjs/Observable"
import { parseXML } from "./../../utils/parseXML"
import { parse } from "./utils/parse"

const fetchWeatherWarningEpic = (action$, _, { http }) =>
    action$.ofType(actionTypes.FETCH_WEATHER_WARNING)
        .switchMap(action =>
            http.get(`http://rss.weather.gov.hk/rss/WeatherWarningSummaryv2_uc.xml`)
                .map(response => response.xhr._response)
                .switchMap(xml =>
                    parseXML(xml)
                        .catch(err => Observable.empty())
                )
                .map(jObject => parse(jObject[1]))
                .map(payload => actions.fetchWeatherWarningFulfilled(payload))
                .takeUntil(action$.ofType(actionTypes.FETCH_WEATHER_WARNING_CANCELLED))
                .catch(err => Observable.of(actions.fetchWeatherWarningError(err)))
        );

export default combineEpics(
    fetchWeatherWarningEpic,
)