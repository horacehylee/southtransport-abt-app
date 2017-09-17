import moment from "moment-timezone"
require("moment/locale/zh-hk")

export const parseJourneyTime = (jobject) => {
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