import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';
import moment from "moment-timezone"
require("moment/locale/zh-hk")
import Button from "./../tabBar/Button"
import isEmpty from "lodash/isEmpty"
import ListViewItem from "./../../components/ListItemView"
import ListDivider from "./../../components/ListDivider"
import { Theme } from "./../../theme"
import renderIf from "./../../utils/renderIf"

const checkTimeWithin = hours => inputDateTime => {
    let currentMoment = moment();
    let inputMoment = moment(inputDateTime);
    return currentMoment.diff(inputDateTime, 'h') <= hours;
}

const checkTimeWithin12Hours = checkTimeWithin(12)

class Notifications extends Component {
    state = {
        refreshing: false,
        data: [
            {
                key: "1",
                title: "為配合高鐵香港段西九龍站的道路改善工程，因水管爆裂，昌榮路往和宜合道方向近同珍工業大廈的部份行車線仍然封閉。",
                details: "柯士甸道西與連翔道交界的地下行車道系統會分階段開通。其中第一階段，即由明日(九月十七日)上午七時起，開通部分柯士甸道西第一層的地下行車道，而近港鐵九龍站的柯士甸道西西面環迴路亦會開通。",
                createDate: "2017-09-15T21:32:35"
            },
            {
                key: "2",
                title: "目前使用柯士甸道西地面行車路",
                details: "將改行新建的第一層地下行車道，來往尖沙咀/港鐵九龍站一帶； 2.來往港鐵九龍站部分上蓋屋苑或商場停車場的車輛，將由現時的地面臨時路，改行柯士甸道西西面環迴路。 運輸署提醒駕駛人士，當駛經有關路段時，要留意現場設置的交通標誌，小心駕駛。",
                createDate: "2017-09-15T18:32:35"
            },
            {
                key: "3",
                title: "為配合最後一個階段的獅子山隧道",
                details: "",
                createDate: "2017-09-15T12:35:35"
            },
            {
                key: "4",
                details: "獅子山隧道(九龍方向)由其收費廣場起，至其九龍出口的慢線，將於今天晚上11時至下星期一（9月18日）凌晨4時30分期間臨時封閉。",
                createDate: "2017-09-15T11:32:35"
            },
            {
                key: "5",
                title: "有關的特別交通安排詳情已上載運輸署網頁 ",
                details: "昌榮路往和宜合道方向近同珍工業大廈的部份行車線仍然封閉",
                createDate: "2017-09-14T11:32:35"
            },
        ]
    }

    refresh() {

    }

    getItemDateString(item) {
        let itemDateTime = moment(item.createDate).tz("Asia/Shanghai")
        let timeFormat = "ah時mm分"
        if (checkTimeWithin12Hours(itemDateTime)) {
            return `${itemDateTime.fromNow()} - ${itemDateTime.format(timeFormat)}`
        } else {
            return itemDateTime.format(`YYYY年MoDo - ${timeFormat}`)
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
                            colors={[Theme.primary]}
                        />
                    }
                    data={this.state.data}
                    renderItem={({ item, index }) => (
                        <ListViewItem data={this.state.data} index={index}>
                            <View style={[styles.item]}>
                                <View style={styles.contentContainer}>
                                    {renderIf(!isEmpty(item.title),
                                        <Text style={[styles.itemTitle]}>
                                            {item.title}
                                        </Text>
                                    )}
                                    {renderIf(!isEmpty(item.details),
                                        <Text style={[styles.itemDetail, { color: "black" }]}>
                                            {item.details}
                                        </Text>
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
        color: Theme.primary,
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