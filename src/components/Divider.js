import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

class Divider extends Component {
    state = {}
    render() {
        return (
            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dividerContainer: {
        backgroundColor: "white",
    },
    divider: {
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        marginHorizontal: 12,
    },
})

export default Divider;