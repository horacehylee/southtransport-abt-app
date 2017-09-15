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
import RoadPhotos from "./../roadPhoto/RoadPhotos"
import Notices from "./../notice/Notices"
import Notifications from "./../notification/Notifications"

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
                        initialPage={1}
                        renderTabBar={
                            () => (<DefaultTabBar
                                textStyle={styles.tabButtonText}
                                activeTextColor={"#157cbe"}
                                backgroundColor={"white"}
                                underlineStyle={{ height: 2, backgroundColor: "#157cbe" }} />)
                        }
                    >
                        <RoadCondition tabLabel="路況" style={[styles.tabView]} />
                        <RoadPhotos tabLabel="實景" style={styles.tabView} />
                        <Notices tabLabel="消息" style={styles.tabView} />
                        <Notifications tabLabel="通知" style={styles.tabView} />
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
        // padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    noPadding: {
        padding: 0,
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