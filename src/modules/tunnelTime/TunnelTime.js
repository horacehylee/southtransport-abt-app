import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    AppState,
} from "react-native"
import { parseString } from "react-native-xml2js"
import TunnelTimeDisplay from "./TunnelTimeDisplay"
import TunnelTimeTitle from "./TunnelTimeTitle"
import moment from "moment-timezone"
require("moment/locale/zh-hk")
const Button = require('./../../components/Button');
import { connect } from 'react-redux';
import * as tunnelTimeActions from "./actions"
import { bindActionCreators } from "redux"
import isEmpty from "lodash/isEmpty"

class TunnelTime extends Component {

    componentDidMount() {
        this.props.actions.pollStartJourneyTime();
        AppState.addEventListener('change', (state) => {
            if (state === 'active') {
                if (this.state.showing) {
                    this.props.actions.pollStartJourneyTime();
                }
            }
            if (state === 'background') {
                this.props.actions.pollStopJourneyTime();
            }
        })
    }

    componentWillUnmount() {
        this.props.actions.pollStopJourneyTime();
    }

    state = {
        showing: true,
    }

    tabWillBeVisible() {
        this.setState({
            showing: true,
        })
        this.props.actions.pollStartJourneyTime();
    }

    tabWillBeHidden() {
        this.setState({
            showing: false,
        })
        this.props.actions.pollStopJourneyTime();
    }

    getCaptureTimeString() {
        if (this.props.captureDateTime) {
            let timeString = this.props.captureDateTime.format("HH:mm")
            return `(${timeString})`
        }
    }

    renderJourneyTimes() {
        if (!isEmpty(this.props.tunnelJourneyTimes)) {
            return (
                <View style={styles.horizontal}>
                    {this.props.tunnelJourneyTimes.map((tunnelJourneyTime) => (
                        <View key={tunnelJourneyTime.key} style={[styles.horizontal, styles.tunnelTimeContainer]}>
                            {/* <Button key={tunnelJourneyTime.key}> */}
                            <TunnelTimeTitle title={tunnelJourneyTime.name} />
                            <TunnelTimeDisplay time={tunnelJourneyTime.time} color={tunnelJourneyTime.color} />
                            {/* </Button> */}
                        </View>
                    ))}
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
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
    container: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: "#ccc",
        justifyContent: "center",
        backgroundColor: '#fff',
        paddingLeft: 16,
        paddingRight: 8,
        height: 48,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    title: {
        fontSize: 14,
        color: "black",
    },
    captureTime: {
        marginLeft: 2,
        fontSize: 12,
    },
    tunnelTimeContainer: {
        padding: 8,
        paddingHorizontal: 3,
    },
    journeyTimesContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
    }
})

function mapStateToProps(state, ownProps) {
    let tunnelTimeState = state.get("tunnelTime")
    return {
        loading: tunnelTimeState.get("loading"),
        captureDateTime: tunnelTimeState.get("captureDateTime"),
        tunnelJourneyTimes: tunnelTimeState.get("tunnelJourneyTimes")
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(tunnelTimeActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(TunnelTime);