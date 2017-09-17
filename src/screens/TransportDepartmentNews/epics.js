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

import { ajax } from 'rxjs/observable/dom/ajax';

const fetchTransportDepartmentNews = (action$, _, { http }) =>
    action$.ofType(actionTypes.FETCH_TRANSPORT_DEPARTMENT_NEWS)
        .switchMap(action =>
            ajax.get(`http://resource.data.one.gov.hk/td/en/specialtrafficnews.xml`)
                .map(response => response.xhr._response)
                .switchMap(xml =>
                    parseXML(xml)
                        .catch(err => Observable.empty())
                )
                .map(jObject => parseNews(jObject[1]))
                .map(payload => actions.fetchNewsFulfilled(payload))
                .takeUntil(action$.ofType(actionTypes.FETCH_TRANSPORT_DEPARTMENT_NEWS_CANCELLED))
                .catch(err => Observable.of(actions.fetchNewsError(err)))
        );

export default combineEpics(
    fetchTransportDepartmentNews,
)