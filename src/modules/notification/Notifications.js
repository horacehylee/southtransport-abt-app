import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';
import moment from "moment"
require("moment/locale/zh-hk")
import Button from "./../tabBar/Button"
import isEmpty from "lodash/isEmpty"
import Divider from "./../../components/Divider"
import ListViewItem from "./../../components/ListItemView"

checkTimeWithin = hours => inputDateTime => {
    let currentMoment = moment();
    let inputMoment = moment(inputDateTime);
    return currentMoment.diff(inputDateTime, 'h') <= hours;
}

checkTimeWithin12Hours = checkTimeWithin(12)

class Notifications extends Component {
    state = {
        refreshing: false,
        data: [
            {
                key: "1",
                title: "First Notification Title",
                details: "Hello this is notification",
                createDate: "2017-09-14T21:32:35"
            },
            {
                key: "2",
                title: "Second Notification Title",
                details: "Morbi pulvinar fermentum nunc a scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent aliquam turpis eu dolor iaculis, a viverra magna placerat. Praesent libero eros, eleifend scelerisque odio id, sodales tristique massa. Vivamus lectus ante, aliquam pellentesque aliquam eu, feugiat at elit.",
                createDate: "2017-09-15T11:32:35"
            },
            {
                key: "3",
                title: "Third Notification Title",
                details: "",
                createDate: "2017-09-15T18:32:35"
            },
            {
                key: "4",
                title: "Fourth Notification Title, Morbi pulvinar fermentum nunc a scelerisque. ",
                details: "Morbi pulvinar fermentum nunc a scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent aliquam turpis eu dolor iaculis, a viverra magna placerat. Praesent libero eros, eleifend scelerisque odio id, sodales tristique massa. Vivamus lectus ante, aliquam pellentesque aliquam eu, feugiat at elit.",
                createDate: "2017-09-15T11:32:35"
            },
            {
                key: "5",
                title: "Fifth Notification Title, Morbi pulvinar fermentum nunc a scelerisque. ",
                details: "Morbi pulvinar fermentum nunc a scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent aliquam turpis eu dolor ia",
                createDate: "2017-09-15T11:32:35"
            },
        ]
    }

    refresh() {

    }

    getItemDateString(item) {
        let itemDateTime = moment.utc(item.createDate)
        console.log("itemDateTime", itemDateTime.format())
        if (checkTimeWithin12Hours(itemDateTime)) {
            return `${itemDateTime.fromNow()} - ${itemDateTime.format("hh:mm a")}`
        } else {
            return itemDateTime.format("YYYY年MoDo - hh:mm a")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList style={styles.list}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refresh}
                            colors={["#157cbe"]}
                        />
                    }
                    data={this.state.data}
                    renderItem={({ item, index }) => (
                        <ListViewItem data={this.state.data} index={index}>
                            <View style={[styles.item]}>
                                <View style={styles.contentContainer}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    {!isEmpty(item.details) ?
                                        <Text style={styles.itemDetail}>{item.details}</Text> : null}
                                    <View style={{}}>
                                        <Text style={styles.itemDate}>{this.getItemDateString(item)}</Text>
                                    </View>
                                </View>
                            </View>
                            <Divider />
                        </ListViewItem>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    right: {
        alignItems: "flex-end"
    },
    container: {
        flex: 1,
    },
    list: {
    },
    item: {
        // minHeight: 72,
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 16,
        justifyContent: "center"
    },
    contentContainer: {

    },
    itemTitle: {
        fontSize: 16,
        color: "black",
    },
    itemDetail: {
        marginTop: 8,
        fontSize: 14,
        // color: "black",
    },
    itemDate: {
        marginTop: 8,
        fontSize: 14,
    },
})

export default Notifications;