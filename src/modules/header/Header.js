import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Button from "./../tabBar/Button"

class Header extends Component {
    state = {}

    gotoFacebook() {
        console.log("Facebook")
    }

    render() {
        return (
            <View style={styles.header}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {"香隧即時睇"}
                        </Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Button>
                            <View style={styles.buttonContainer}>
                                <Icon name="timetable" style={styles.button} />
                            </View>
                        </Button>
                        <Button>
                            <View style={styles.buttonContainer}>
                                <Icon name="facebook-box" style={styles.button} />
                            </View>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 56,
        // minHeight: 56,
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: 'center',
        // alignItems: "center",
        backgroundColor: "#157CBE",
        // paddingTop: 16,
        // paddingBottom: 8,
        paddingLeft: 16,
        // paddingRight: 16,
        // display: "flex",
        // padding: 16,
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    titleContainer: {
    },
    title: {
        fontSize: 20,
        color: "white",
        // fontWeight: "bold",
    },
    rightContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    buttonContainer: {
        padding: 12,
    },
    button: {
        color: "white",
        fontSize: 32,
    }
});

export default Header;