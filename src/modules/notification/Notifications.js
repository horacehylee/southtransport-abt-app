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
import ListViewItem from "./../../components/ListItemView"
import ListDivider from "./../../components/ListDivider"
import { Theme } from "./../../theme"
import renderIf from "./../../utils/renderIf"

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
                title: "用卒太健複部室外秘昨稿添方",
                details: "閲学集章朝容使意暴列埼",
                createDate: "2017-09-14T21:32:35"
            },
            {
                key: "2",
                title: "元遊年所読社射",
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
                                    {renderIf(!isEmpty(item.title),
                                        <Text style={[styles.itemTitle, { color: Theme.primary }]}>{item.title}</Text>
                                    )}
                                    {renderIf(!isEmpty(item.details),
                                        <Text style={styles.itemDetail}>{item.details}</Text>
                                    )}
                                    <View style={{}}>
                                        <Text style={styles.itemDate}>{this.getItemDateString(item)}</Text>
                                    </View>
                                </View>
                            </View>
                            <ListDivider data={this.state.data} index={index} />
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
        justifyContent: "center",
    },
    contentContainer: {
        
    },
    itemTitle: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
    },
    itemDetail: {
        marginTop: 8,
        fontSize: 14,
        color: "black",
    },
    itemDate: {
        marginTop: 8,
        fontSize: 14,
    },
})

export default Notifications;