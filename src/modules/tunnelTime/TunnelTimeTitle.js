import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from "react-native"

class TunnelTimeTitle extends Component {
    state = {}
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
    },
    title: {
        marginRight: 4,
        color: "black"
    }
})

export default TunnelTimeTitle;