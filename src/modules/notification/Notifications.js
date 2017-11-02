import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';
import moment from "moment-timezone"
import ListViewItem from "./../../components/ListItemView"
import { Theme } from "./../../theme"
import ListItem from "./../../components/ListItem"

import { connect } from 'react-redux';
import { bindActionCreators } from "redux"
import * as notificationActions from "./actions"

import isEmpty from 'lodash/isEmpty';

class Notifications extends Component {
    state = {}

    componentDidMount() {
        this.props.actions.fetch()
    }

    refresh = () => {
        this.props.actions.fetch()
    }

    render() {
        return (
            <View>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.loading && !isEmpty(this.props.notifications)}
                            onRefresh={this.refresh}
                            colors={[Theme.primary]}
                        />
                    }
                    data={this.props.notifications}
                    renderItem={({ item, index }) => (
                        <ListViewItem data={this.props.notifications} index={index}>
                            <ListItem
                                title={item.title}
                                details={item.details}
                                date={item.date}
                            />
                        </ListViewItem>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
})


const mapStateToProps = (state, ownProps) => {
    let notification = state.get("notification")
    return {
        loading: notification.get("loading"),
        notifications: notification.get("notifications"),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(notificationActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);