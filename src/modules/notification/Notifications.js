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

class Notifications extends Component {
    state = {
        refreshing: false,
        data: [
            {
                key: "1",
                title: "為配合高鐵香港段西九龍站的道路改善工程，因水管爆裂，昌榮路往和宜合道方向近同珍工業大廈的部份行車線仍然封閉。",
                details: "柯士甸道西與連翔道交界的地下行車道系統會分階段開通。其中第一階段，即由明日(九月十七日)上午七時起，開通部分柯士甸道西第一層的地下行車道，而近港鐵九龍站的柯士甸道西西面環迴路亦會開通。",
                date: "2017-09-16T14:32:35"
            },
            {
                key: "2",
                title: "目前使用柯士甸道西地面行車路",
                details: "將改行新建的第一層地下行車道，來往尖沙咀/港鐵九龍站一帶； 2.來往港鐵九龍站部分上蓋屋苑或商場停車場的車輛，將由現時的地面臨時路，改行柯士甸道西西面環迴路。 運輸署提醒駕駛人士，當駛經有關路段時，要留意現場設置的交通標誌，小心駕駛。",
                date: "2017-09-15T18:32:35"
            },
            {
                key: "3",
                title: "為配合最後一個階段的獅子山隧道",
                details: "",
                date: "2017-09-15T12:35:35"
            },
            {
                key: "4",
                details: "獅子山隧道(九龍方向)由其收費廣場起，至其九龍出口的慢線，將於今天晚上11時至下星期一（9月18日）凌晨4時30分期間臨時封閉。",
                date: "2017-09-15T11:32:35"
            },
            {
                key: "5",
                title: "有關的特別交通安排詳情已上載運輸署網頁 ",
                details: "昌榮路往和宜合道方向近同珍工業大廈的部份行車線仍然封閉",
                date: "2017-09-14T11:32:35"
            },
        ]
    }

    refresh() {

    }

    render() {
        return (
            <View>
                <FlatList
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
                            <ListItem
                                title={item.title}
                                details={item.details}
                                date={moment(item.date).tz("Asia/Shanghai")}
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

export default Notifications;