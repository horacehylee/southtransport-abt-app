import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from "react-native"
import { parseString } from "react-native-xml2js"
import TunnelTimeDisplay from "./TunnelTimeDisplay"
import TunnelTimeTitle from "./TunnelTimeTitle"
import moment from "moment"
require("moment/locale/zh-hk")
const Button = require('./../tabBar/Button');

const xml = `
<jtis_journey_list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://data.one.gov.hk/td" xsi:schemaLocation="http://data.one.gov.hk/td http://data.one.gov.hk/xsd/td/journeytime.xsd">
<jtis_journey_time>
<LOCATION_ID>H2</LOCATION_ID>
<DESTINATION_ID>CH</DESTINATION_ID>
<CAPTURE_DATE>2017-09-14T11:32:35</CAPTURE_DATE>
<JOURNEY_TYPE>1</JOURNEY_TYPE>
<JOURNEY_DATA>10</JOURNEY_DATA>
<COLOUR_ID>2</COLOUR_ID>
<JOURNEY_DESC/>
</jtis_journey_time>
<jtis_journey_time>
<LOCATION_ID>H2</LOCATION_ID>
<DESTINATION_ID>EH</DESTINATION_ID>
<CAPTURE_DATE>2017-09-14T11:32:35</CAPTURE_DATE>
<JOURNEY_TYPE>1</JOURNEY_TYPE>
<JOURNEY_DATA>13</JOURNEY_DATA>
<COLOUR_ID>3</COLOUR_ID>
<JOURNEY_DESC/>
</jtis_journey_time>
<jtis_journey_time>
<LOCATION_ID>H2</LOCATION_ID>
<DESTINATION_ID>WH</DESTINATION_ID>
<CAPTURE_DATE>2017-09-14T11:32:35</CAPTURE_DATE>
<JOURNEY_TYPE>1</JOURNEY_TYPE>
<JOURNEY_DATA>20</JOURNEY_DATA>
<COLOUR_ID>2</COLOUR_ID>
<JOURNEY_DESC/>
</jtis_journey_time>
<jtis_journey_time>
<LOCATION_ID>H1</LOCATION_ID>
<DESTINATION_ID>EH</DESTINATION_ID>
<CAPTURE_DATE>2017-09-14T11:32:35</CAPTURE_DATE>
<JOURNEY_TYPE>1</JOURNEY_TYPE>
<JOURNEY_DATA>11</JOURNEY_DATA>
<COLOUR_ID>3</COLOUR_ID>
<JOURNEY_DESC/>
</jtis_journey_time>
</jtis_journey_list>
`

function averageDateTime(array) {
    if (!array instanceof Array)
        throw new Error("averageDateTime must have array input")

    let sum = array.reduce((prev, curr) => prev.getTime() + curr.getTime())
    let avg = sum / array.length
    return new Date(avg)
}

class TunnelTime extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        parseString(xml, { trim: true }, (err, result) => {
            if (err)
                console.error("Parse XML error", err)
            console.log("Parse XML result", result)
            this.parseJourneyTimeData(result)
        })
    }

    state = {}

    parseJourneyTimeData(jobject) {
        let journeytimes = jobject.jtis_journey_list.jtis_journey_time
        journeytimes = journeytimes.filter((journeytime) => journeytime.LOCATION_ID[0] === 'H2')

        let captureDateTime = moment.utc(journeytimes[0].CAPTURE_DATE[0])

        this.setState({
            captureDateTime: captureDateTime,
            tunnelJourneyTimes: [
                {
                    name: "西隧",
                    time: 13,
                    color: "#00FF00"
                },
                {
                    name: "東隧",
                    time: 12,
                    color: "#00FF00"
                },
                {
                    name: "紅隧",
                    time: 15,
                    color: "#FFFF00"
                },
            ]
        })
    }

    getCaptureTimeString() {
        if (this.state.captureDateTime) {
            let timeString = this.state.captureDateTime.format("HH:mm")
            return ` (${timeString})`
        }
    }

    renderJourneyTimes() {
        if (this.state.tunnelJourneyTimes) {
            return (
                <View style={styles.horizontal}>
                    {this.state.tunnelJourneyTimes.map((tunnelJourneyTime) => (
                        <Button key={tunnelJourneyTime.name}>
                            <View style={[styles.horizontal, styles.tunnelTimeContainer]}>
                                <TunnelTimeTitle title={tunnelJourneyTime.name} />
                                <TunnelTimeDisplay time={tunnelJourneyTime.time} color={tunnelJourneyTime.color} />
                            </View>
                        </Button>
                    ))}
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.card}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        香隧過海時間
                    </Text>
                    <Text style={styles.captureTime}>
                        {this.getCaptureTimeString()}
                    </Text>
                </View>
                <View style={styles.journeyTimesContainer}>
                    {this.renderJourneyTimes()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection: "row",
    },
    card: {
        // flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        justifyContent: "center",
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        paddingLeft: 16,
        // paddingRight: 16,
        // padding: 16,
        // paddingTop: 8,
        // paddingBottom: 24,
        // shadowColor: '#ccc',
        // shadowOffset: { width: 2, height: 2, },
        // shadowOpacity: 0.5,
        // shadowRadius: 3,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        color: "black",
    },
    captureTime: {
        marginLeft: 2,
        fontSize: 12,
    },
    tunnelTimeContainer: {
        padding: 8,
    },
    journeyTimesContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
    }

})

export default TunnelTime;