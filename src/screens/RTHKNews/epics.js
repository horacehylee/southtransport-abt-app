import * as actions from "./actions"
import * as actionTypes from "./actionTypes"
import { combineEpics } from "redux-observable"

import { map } from 'rxjs/operator/map'
import { mergeMap } from 'rxjs/operator/mergeMap'
import { filter } from "rxjs/operator/filter"
import { delay } from "rxjs/operator/delay"
import { Observable } from "rxjs/Observable"
import { parseXML } from "./../../utils/parseXML"
import { parseNews } from "./utils/parseNews"

const fetchRTHKNews = (action$, _, { http }) =>
    action$.ofType(actionTypes.FETCH_RTHK_NEWS)
        .switchMap(action =>
            http.get(`http://rthk9.rthk.hk/apps/news/c_traffic_news.xml`)
                .map(response => response.xhr._response)
                .switchMap(xml =>
                    parseXML(xml)
                        .catch(err => Observable.empty())
                )
                .map(jObject => parseNews(jObject[1]))
                .do((object) => console.log("response", object))
                .map(payload => actions.fetchNewsFulfilled(payload))
                .takeUntil(action$.ofType(actionTypes.FETCH_RTHK_NEWS_CANCELLED))
                .catch(err => Observable.of(actions.fetchNewsError(err)))
        );

export default combineEpics(
    fetchRTHKNews,
)