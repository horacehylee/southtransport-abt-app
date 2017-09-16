import React, { Component } from "react"
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    ActivityIndicator,
} from "react-native"
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from "./../tabBar/DefaultTabBar"
import Header from "./../header/Header"
import RoadCondition from "./RoadCondition"
import RoadPhotos from "./../roadPhoto/RoadPhotos"
import Notices from "./../notice/Notices"
import Notifications from "./../notification/Notifications"
import { Theme } from "./../../theme"

export class Main extends Component {
    constructor(props) {
        super(props)
    }

    state = {}

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
                        renderTabBar={
                            () => (<DefaultTabBar
                                textStyle={styles.tabButtonText}
                                activeTextColor={Theme.primary}
                                backgroundColor={"white"}
                                underlineStyle={{ height: 4, backgroundColor: Theme.primary }} />)
                        }
                        locked={true}
                    >
                        <RoadCondition tabLabel="路況" {...this.props} />
                        <RoadPhotos tabLabel="實景" {...this.props} />
                        <Notices tabLabel="消息" {...this.props} />
                        <Notifications tabLabel="通知" {...this.props} />
                    </ScrollableTabView>
                </View>
            </View >
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
    },
    padding: {
        marginBottom: 8,
    }
});