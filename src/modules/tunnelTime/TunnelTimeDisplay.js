import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from "react-native"

class TunnelTimeDisplay extends Component {
    state = {}
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.time, {color: this.props.color}]}>
                    {this.props.time}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        borderRadius: 3,
        minWidth: 24,
    },
    time: {
        fontWeight: "bold",
    }
})

export default TunnelTimeDisplay;