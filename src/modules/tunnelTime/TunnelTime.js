import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from "react-native"
import { parseString } from "react-native-xml2js"
import TunnelTimeDisplay from "./TunnelTimeDisplay"
import TunnelTimeTitle from "./TunnelTimeTitle"
import moment from "moment-timezone"
require("moment/locale/zh-hk")
const Button = require('./../tabBar/Button');

function averageDateTime(array) {
    if (!array instanceof Array)
        throw new Error("averageDateTime must have array input")

    let sum = array.reduce((prev, curr) => prev.getTime() + curr.getTime())
    let avg = sum / array.length
    return new Date(avg)
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

class TunnelTime extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        parseString(xml, { trim: true }, (err, result) => {
            if (err) {
                console.error("Parse XML error", err)
                return
            }
            console.log("Parse XML result", result)
            this.parseJourneyTimeData(result)
        })
    }

    state = {}



    parseJourneyTimeData(jobject) {
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

        this.setState({
            captureDateTime: captureDateTime,
            tunnelJourneyTimes: tunnelJourneyTimes,
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
                        <Button key={tunnelJourneyTime.key}>
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
                        {"香隧過海時間"}
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
        paddingRight: 8,
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
        paddingHorizontal: 6,
    },
    journeyTimesContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
    }

})

// http://resource.data.one.gov.hk/td/journeytime.xml
const xml = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<jtis_journey_list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://data.one.gov.hk/td http://data.one.gov.hk/xsd/td/journeytime.xsd" xmlns="http://data.one.gov.hk/td">
    <jtis_journey_time>
        <LOCATION_ID>H11</LOCATION_ID>
        <DESTINATION_ID>CH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>20</JOURNEY_DATA>
        <COLOUR_ID>2</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>H11</LOCATION_ID>
        <DESTINATION_ID>EH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>4</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>H1</LOCATION_ID>
        <DESTINATION_ID>CH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>18</JOURNEY_DATA>
        <COLOUR_ID>1</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>H1</LOCATION_ID>
        <DESTINATION_ID>EH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>11</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>H2</LOCATION_ID>
        <DESTINATION_ID>CH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>23</JOURNEY_DATA>
        <COLOUR_ID>1</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>H2</LOCATION_ID>
        <DESTINATION_ID>EH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>12</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>H2</LOCATION_ID>
        <DESTINATION_ID>WH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>11</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>H3</LOCATION_ID>
        <DESTINATION_ID>CH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>18</JOURNEY_DATA>
        <COLOUR_ID>2</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>H3</LOCATION_ID>
        <DESTINATION_ID>WH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>11</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K01</LOCATION_ID>
        <DESTINATION_ID>CH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>19</JOURNEY_DATA>
        <COLOUR_ID>2</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K01</LOCATION_ID>
        <DESTINATION_ID>WH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>6</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K02</LOCATION_ID>
        <DESTINATION_ID>CH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>14</JOURNEY_DATA>
        <COLOUR_ID>2</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K02</LOCATION_ID>
        <DESTINATION_ID>EH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>11</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K03</LOCATION_ID>
        <DESTINATION_ID>CH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>13</JOURNEY_DATA>
        <COLOUR_ID>2</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K03</LOCATION_ID>
        <DESTINATION_ID>EH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>15</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K03</LOCATION_ID>
        <DESTINATION_ID>WH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>18</JOURNEY_DATA>
        <COLOUR_ID>2</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K04</LOCATION_ID>
        <DESTINATION_ID>CH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>11</JOURNEY_DATA>
        <COLOUR_ID>2</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K04</LOCATION_ID>
        <DESTINATION_ID>WH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>17</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K05</LOCATION_ID>
        <DESTINATION_ID>CH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>16</JOURNEY_DATA>
        <COLOUR_ID>2</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K05</LOCATION_ID>
        <DESTINATION_ID>EH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>14</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K06</LOCATION_ID>
        <DESTINATION_ID>CH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>11</JOURNEY_DATA>
        <COLOUR_ID>2</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>K06</LOCATION_ID>
        <DESTINATION_ID>WH</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:35</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>18</JOURNEY_DATA>
        <COLOUR_ID>2</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ1</LOCATION_ID>
        <DESTINATION_ID>LRT</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>7</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ1</LOCATION_ID>
        <DESTINATION_ID>SMT</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>8</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ1</LOCATION_ID>
        <DESTINATION_ID>TSCA</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>8</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ2</LOCATION_ID>
        <DESTINATION_ID>LRT</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>8</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ2</LOCATION_ID>
        <DESTINATION_ID>TCT</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>5</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ2</LOCATION_ID>
        <DESTINATION_ID>TSCA</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>12</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ3</LOCATION_ID>
        <DESTINATION_ID>LRT</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>10</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ3</LOCATION_ID>
        <DESTINATION_ID>TCT</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>9</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ3</LOCATION_ID>
        <DESTINATION_ID>TSCA</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>11</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ4</LOCATION_ID>
        <DESTINATION_ID>TKTL</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>9</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ4</LOCATION_ID>
        <DESTINATION_ID>TKTM</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>23</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ5</LOCATION_ID>
        <DESTINATION_ID>TWCP</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>31</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
    <jtis_journey_time>
        <LOCATION_ID>SJ5</LOCATION_ID>
        <DESTINATION_ID>TWTM</DESTINATION_ID>
        <CAPTURE_DATE>2017-09-16T14:16:22</CAPTURE_DATE>
        <JOURNEY_TYPE>1</JOURNEY_TYPE>
        <JOURNEY_DATA>15</JOURNEY_DATA>
        <COLOUR_ID>3</COLOUR_ID>
        <JOURNEY_DESC></JOURNEY_DESC>
    </jtis_journey_time>
</jtis_journey_list>
`

export default TunnelTime;