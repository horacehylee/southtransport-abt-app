import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from "react-native"
import AbtMap from "./../../../modules/map/Map"
import { TunnelTime } from "./../../../modules/tunnelTime"

export class RoadCondition extends Component {

    tabWillBeVisible() {
        if (this.tunnelTime && this.tunnelTime.tabWillBeVisible) {
            this.tunnelTime.tabWillBeVisible()
        }
    }

    tabWillBeHidden() {
        if (this.tunnelTime && this.tunnelTime.tabWillBeHidden) {
            this.tunnelTime.tabWillBeHidden()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {<AbtMap />}
                <TunnelTime ref={ref => this.tunnelTime = ref} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})