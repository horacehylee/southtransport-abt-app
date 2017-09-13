import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from "react-native"

class TunnelTime extends Component {
    state = {}
    render() {
        return (
            <View>
                <Text style={styles.card}>
                    過海行車時間
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 50,
        padding: 16,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
})

export default TunnelTime;