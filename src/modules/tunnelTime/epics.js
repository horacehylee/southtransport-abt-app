import * as actions from "./actions"
import * as actionTypes from "./actionTypes"
import { combineEpics } from "redux-observable"
import { ajax } from 'rxjs/observable/dom/ajax';
import { map } from 'rxjs/operator/map'
import { flatMap, mergeMap } from 'rxjs/operator/mergeMap'
import { filter } from "rxjs/operator/filter"
import { delay } from "rxjs/operator/delay"
import Rx from 'rxjs/Rx';
import { parseXML } from "./../../utils/parseXML"
import moment from "moment-timezone"
require("moment/locale/zh-hk")

const fetchJourneyTimeEpic = action$ => {
    console.log("action$", action$)
    console.log("type", typeof action$)
    return action$.ofType(actionTypes.FETCH_JOURNEY_TIME)
        .mergeMap(action =>
            ajax.get(`http://resource.data.one.gov.hk/td/journeytime.xml`)
                .map(response => response.xhr._response)
                .flatMap(xml => parseXML(xml))
                .map(jObject => parseJourneyTimeData(jObject[1]))
                .map(payload => actions.fetchJourneyTimeFulfilled(payload))
        );
}

const mapDestinationIdToTunnelName = (locationId) => {
    let tunnelName = ""
    switch (locationId) {
        case 'CH':
            tunnelName = "紅隧"
            break;
        case 'WH':
            tunnelName = "西隧"
            break;
        case 'EH':
            tunnelName = "東隧"
            break;
    }
    return tunnelName
}

const mapColorIdToString = (colorId) => {
    let color = "white"
    switch (colorId) {
        case "3":
            color = "#00FF00"
            break
        case "2":
            color = "#FFFF00"
            break
        case "1":
            color = "#FF0000"
            break;
    }
    return color
}

const parseJourneyTimeData = (jobject) => {
    let journeytimes = jobject.jtis_journey_list.jtis_journey_time
    journeytimes = journeytimes.filter((journeytime) => journeytime.LOCATION_ID[0] === 'H2')

    let captureDateTime = moment(journeytimes[0].CAPTURE_DATE[0]).tz("Asia/Shanghai")
    let tunnelJourneyTimes = journeytimes.map((journeyTime, i) => (
        {
            key: journeyTime.LOCATION_ID[0] + "_" + i,
            name: mapDestinationIdToTunnelName(journeyTime.DESTINATION_ID[0]),
            color: mapColorIdToString(journeyTime.COLOUR_ID[0]),
            time: journeyTime.JOURNEY_DATA[0]
        }
    ))

    return {
        captureDateTime: captureDateTime,
        tunnelJourneyTimes: tunnelJourneyTimes,
    }
}

export default combineEpics(
    fetchJourneyTimeEpic,
)