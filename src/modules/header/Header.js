import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from "react-native"

class Header extends Component {
    state = {}
    render() {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>香隧即時睇</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 40,
        justifyContent: 'center',
        backgroundColor: "white",
        paddingTop: 16,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        color: "black",
    },
});

export default Header;