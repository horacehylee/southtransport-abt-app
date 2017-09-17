import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from "react-native"
import AbtMap from "./../../../modules/map/Map"
import { TunnelTime } from "./../../../modules/tunnelTime"

export class RoadCondition extends Component {
    state = {
        tunnelTime: null,
    }

    tabWillBeVisible() {
        let tunnelTime = this.state.tunnelTime.getWrappedInstance()
        if (tunnelTime && tunnelTime.tabWillBeVisible) {
            tunnelTime.tabWillBeVisible()
        }
    }

    tabWillBeHidden() {
        let tunnelTime = this.state.tunnelTime.getWrappedInstance()
        if (tunnelTime && tunnelTime.tabWillBeHidden) {
            tunnelTime.tabWillBeHidden()
        }
    }

    addTunnelTime = (instance) => {
        console.log(instance)
        this.setState({
            tunnelTime: instance
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <AbtMap />
                <TunnelTime ref={this.addTunnelTime} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})