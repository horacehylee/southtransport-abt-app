import React, { Component } from "react"
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    ActivityIndicator,
} from "react-native"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from "./../../modules/tabBar/DefaultTabBar"
import Header from "./../../components/Header"
import { RoadCondition } from "./components/RoadCondition"
import RoadPhotos from "./../../modules/roadPhoto/RoadPhotos"
import Notices from "./../../modules/notice/Notices"
import Notifications from "./../../modules/notification/Notifications"
import { Theme } from "./../../theme"
import * as mainActions from "./actions"

class Main extends Component {
    constructor(props) {
        super(props)
    }

    state = {}

    static navigatorStyle = {
        navBarHidden: true,
    };

    onChangeTab = ({ i }) => {
        this.props.actions.changeTab(this.props.tabIndex, i)
    }

    render() {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.contentContainer}>
                    <Header />
                    <ScrollableTabView
                        initialPage={this.props.tabIndex}
                        renderTabBar={
                            () => (<DefaultTabBar
                                textStyle={styles.tabButtonText}
                                activeTextColor={Theme.primary}
                                backgroundColor={"white"}
                                underlineStyle={{ height: 4, backgroundColor: Theme.primary }} />)
                        }
                        onChangeTab={this.onChangeTab}
                        locked={true}
                    >
                        <RoadCondition tabLabel="路況" />
                        <RoadPhotos tabLabel="實景" />
                        <Notices tabLabel="消息" navigator={this.props.navigator} />
                        <Notifications tabLabel="通知" />
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


function mapStateToProps(state, ownProps) {
    let mainState = state.get("main")
    return {
        tabIndex: mainState.get("tabIndex")
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(mainActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);