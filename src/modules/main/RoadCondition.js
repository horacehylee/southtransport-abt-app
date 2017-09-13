import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from "react-native"
import AbtMap from "./../map/map"
import TunnelTime from "./../tunnelTime/TunnelTime"

class RoadCondition extends Component {
    state = {}
    render() {
        return (
            <View style={styles.container}>
                <AbtMap />
                <TunnelTime />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default RoadCondition;