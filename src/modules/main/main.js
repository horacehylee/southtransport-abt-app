import React, { Component } from "react"
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
} from "react-native"
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from "./../tabBar/DefaultTabBar"
import Header from "./../header/Header"
import RoadCondition from "./RoadCondition"

export class Main extends Component {
    static navigatorStyle = {
        navBarHidden: true,
    };

    render() {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.contentContainer}>
                    <Header />
                    <ScrollableTabView
                        initialPage={0}
                        renderTabBar={() => <DefaultTabBar textStyle={styles.tabButtonText} backgroundColor={"white"} underlineStyle={{ height: 2 }} />}>
                        <RoadCondition tabLabel="路況" style={styles.tabView} />
                        <ScrollView tabLabel="快拍" style={styles.tabView}>
                            <View style={styles.card}>
                                <Text>快拍</Text>
                            </View>
                        </ScrollView>
                        <ScrollView tabLabel="消息" style={styles.tabView}>
                            <View style={styles.card}>
                                <Text>消息</Text>
                            </View>
                        </ScrollView>
                        <ScrollView tabLabel="通知" style={styles.tabView}>
                            <View style={styles.card}>
                                <Text>通知</Text>
                            </View>
                        </ScrollView>
                    </ScrollableTabView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabButtonText: {
        fontSize: 16,
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    contentContainer: {
        flex: 1,
    },
    noFlex: {
        flex: 0
    }
});