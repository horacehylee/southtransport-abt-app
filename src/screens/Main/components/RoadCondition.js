import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from "react-native"
import AbtMap from "./../../../modules/map/Map"
import { TunnelTime } from "./../../../modules/tunnelTime"

export class RoadCondition extends Component {
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