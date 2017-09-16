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
import { parseString } from "react-native-xml2js"
import ListItemView from "./../components/ListItemView"
import { Theme } from "./../theme"
import ListItem from "./../components/ListItem"

const mapNodeToDate = (node) => {
    let splits = node.time[0].split(" HKT ")
    let date = splits[0]
    let time = splits[1]
    return moment(`${date}T${time}`).tz("Asia/Shanghai")
}

class RTHKNews extends Component {
    state = {
        refreshing: false,
    }

    componentDidMount() {
        parseString(xml, { trim: true }, (err, result) => {
            if (err) {
                console.error("Parse XML error", err)
                return
            }
            console.log("Parse XML result", result)
            this.parseNews(result)
        })
    }

    parseNews(jObject) {
        let news = jObject.channel.item.map((node) => (
            {
                key: node.id[0],
                title: node.title[0],
                date: mapNodeToDate(node),
            }
        ))

        this.setState({
            news: news,
        })
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
                    data={this.state.news}
                    renderItem={({ item, index }) => (
                        <ListItemView data={this.state.news} index={index}>
                            <ListItem
                                title={item.title}
                                date={item.date}
                            />
                        </ListItemView>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
})

export default RTHKNews;

//  http://rthk9.rthk.hk/apps/news/c_traffic_news.xml

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<channel>
   <title><![CDATA[RTHK - Traffic News]]></title>
   <description />
   <pubDate><![CDATA[Sat, 16 Sep 2017 16:30:03 +0800]]></pubDate>
   <item>
      <id>459961</id>
      <title><![CDATA[告士打道西行往紅隧，龍尾：上橋位。]]></title>
      <time><![CDATA[2017-09-16 HKT 16:20]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 16:20:00 +0800</pubDate>
   </item>
   <item>
      <id>459960</id>
      <title><![CDATA[公主道往紅隧，龍尾：康莊道橋面。]]></title>
      <time><![CDATA[2017-09-16 HKT 16:00]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 16:00:00 +0800</pubDate>
   </item>
   <item>
      <id>459959</id>
      <title><![CDATA[堅拿道天橋往紅隧，龍尾：馬會大樓。]]></title>
      <time><![CDATA[2017-09-16 HKT 15:40]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 15:40:00 +0800</pubDate>
   </item>
   <item>
      <id>459958</id>
      <title><![CDATA[受爆水管影響，葵涌昌榮路往和宜合道方向，近同珍工業大廈的部分行車線仍然封閉。]]></title>
      <time><![CDATA[2017-09-16 HKT 15:20]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 15:20:00 +0800</pubDate>
   </item>
   <item>
      <id>459956</id>
      <title><![CDATA[東九龍走廊往紅隧及尖沙咀方向，龍尾：鶴園街。]]></title>
      <time><![CDATA[2017-09-16 HKT 15:00]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 15:00:00 +0800</pubDate>
   </item>
   <item>
      <id>459955</id>
      <title><![CDATA[告士打道東行往紅隧，龍尾：夏愨道近政府總部。]]></title>
      <time><![CDATA[2017-09-16 HKT 14:40]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 14:40:00 +0800</pubDate>
   </item>
   <item>
      <id>459954</id>
      <title><![CDATA[東區海底隧道往港島方向，管道內曾有壞車，現已拖走，龍尾：收費廣場。]]></title>
      <time><![CDATA[2017-09-16 HKT 14:20]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 14:20:00 +0800</pubDate>
   </item>
   <item>
      <id>459952</id>
      <title><![CDATA[受爆水管影響，荃灣路往屯門方向，近晉昇工廠大廈部份行車線仍然封閉，龍尾：興芳路。]]></title>
      <time><![CDATA[2017-09-16 HKT 14:00]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 14:00:00 +0800</pubDate>
   </item>
   <item>
      <id>459951</id>
      <title><![CDATA[漆咸道北往紅隧及尖沙咀方向，龍尾：佛光街橋底。]]></title>
      <time><![CDATA[2017-09-16 HKT 13:30]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 13:30:00 +0800</pubDate>
   </item>
   <item>
      <id>459950</id>
      <title><![CDATA[大埔公路往九龍方向，近御龍山一段擠塞，龍尾：沙田污水處理廠。]]></title>
      <time><![CDATA[2017-09-16 HKT 13:10]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 13:10:00 +0800</pubDate>
   </item>
   <item>
      <id>459953</id>
      <title><![CDATA[較早前因受高空墮物事故而封閉的士丹頓街，近奧卑利街唯一行車線重開。]]></title>
      <time><![CDATA[2017-09-16 HKT 13:05]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 13:05:00 +0800</pubDate>
   </item>
   <item>
      <id>459948</id>
      <title><![CDATA[告士打道西行往中環方向車多，龍尾：菲林明道。]]></title>
      <time><![CDATA[2017-09-16 HKT 12:50]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 12:50:00 +0800</pubDate>
   </item>
   <item>
      <id>459947</id>
      <title><![CDATA[較早前獅子山隧道公路往沙田方向，近新田圍邨的交通意外已清理，車龍有待消散。]]></title>
      <time><![CDATA[2017-09-16 HKT 12:32]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 12:32:00 +0800</pubDate>
   </item>
   <item>
      <id>459946</id>
      <title><![CDATA[較早前漆咸道南往大角咀方向，近理工大學的第3線的交通意外已清理，車龍有待消散。]]></title>
      <time><![CDATA[2017-09-16 HKT 12:23]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 12:23:00 +0800</pubDate>
   </item>
   <item>
      <id>459945</id>
      <title><![CDATA[獅子山隧道公路往沙田方向，近新田圍邨有交通意外，龍尾：瑞峰花園。]]></title>
      <time><![CDATA[2017-09-16 HKT 12:20]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 12:20:00 +0800</pubDate>
   </item>
   <item>
      <id>459942</id>
      <title><![CDATA[漆咸道南往大角咀方向，近理工大學的第3線有交通意外，龍尾：佛光街橋底。]]></title>
      <time><![CDATA[2017-09-16 HKT 12:13]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 12:13:00 +0800</pubDate>
   </item>
   <item>
      <id>459941</id>
      <title><![CDATA[較早前東九龍走廊往觀塘方向，近落山道慢線的壞車已拖走，交通回復正常。]]></title>
      <time><![CDATA[2017-09-16 HKT 12:08]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 12:08:00 +0800</pubDate>
   </item>
   <item>
      <id>459940</id>
      <title><![CDATA[受高空墮物事故影響，士丹頓街近奧卑利街的唯一行車線封閉，車輛禁止由奧卑利街駛入士丹頓街，另外重量超過5.5公噸的車輛禁止由堅道轉入奧卑利街。]]></title>
      <time><![CDATA[2017-09-16 HKT 12:06]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 12:06:00 +0800</pubDate>
   </item>
   <item>
      <id>459939</id>
      <title><![CDATA[東九龍走廊往觀塘方向，近落山道慢線有壞車阻路，龍尾：佛光街上橋位。]]></title>
      <time><![CDATA[2017-09-16 HKT 11:59]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 11:59:00 +0800</pubDate>
   </item>
   <item>
      <id>459938</id>
      <title><![CDATA[香港仔隧道慢線往灣仔方向擠塞，龍尾：管道中間。]]></title>
      <time><![CDATA[2017-09-16 HKT 11:45]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 11:45:00 +0800</pubDate>
   </item>
   <item>
      <id>459937</id>
      <title><![CDATA[較早前因塌樹而封閉的九龍公園徑往油麻地方向，近中間道中、慢線重開。]]></title>
      <time><![CDATA[2017-09-16 HKT 11:28]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 11:28:00 +0800</pubDate>
   </item>
   <item>
      <id>459936</id>
      <title><![CDATA[干諾道中東行往灣仔方向，近大會堂一段擠塞，龍尾：國際金融中心。]]></title>
      <time><![CDATA[2017-09-16 HKT 11:10]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 11:10:00 +0800</pubDate>
   </item>
   <item>
      <id>459935</id>
      <title><![CDATA[東區走廊西行往中環方向擠塞，龍尾：嘉華國際中心。]]></title>
      <time><![CDATA[2017-09-16 HKT 10:50]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 10:50:00 +0800</pubDate>
   </item>
   <item>
      <id>459934</id>
      <title><![CDATA[受塌樹影響，九龍公園徑往油麻地方向，近中間道中、慢線封閉，一帶車多。]]></title>
      <time><![CDATA[2017-09-16 HKT 10:36]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 10:36:00 +0800</pubDate>
   </item>
   <item>
      <id>459933</id>
      <title><![CDATA[將軍澳隧道往九龍方向，龍尾：電話機樓。]]></title>
      <time><![CDATA[2017-09-16 HKT 10:20]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 10:20:00 +0800</pubDate>
   </item>
   <item>
      <id>459932</id>
      <title><![CDATA[加士居道往紅隧，龍尾：渡船街天橋近果欄。]]></title>
      <time><![CDATA[2017-09-16 HKT 10:00]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 10:00:00 +0800</pubDate>
   </item>
   <item>
      <id>459930</id>
      <title><![CDATA[西貢公路往西貢市中心方向車多繁忙，龍尾：匡湖居。]]></title>
      <time><![CDATA[2017-09-16 HKT 09:45]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 09:45:00 +0800</pubDate>
   </item>
   <item>
      <id>459929</id>
      <title><![CDATA[受爆水管影響，荃灣路往屯門方向，近晉昇工廠大廈部份行車線仍然封閉，但未有擠塞。]]></title>
      <time><![CDATA[2017-09-16 HKT 09:30]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 09:30:00 +0800</pubDate>
   </item>
   <item>
      <id>459928</id>
      <title><![CDATA[較早前龍翔道往荃灣方向，近天馬苑的壞車已拖走，交通回復正常。]]></title>
      <time><![CDATA[2017-09-16 HKT 09:24]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 09:24:00 +0800</pubDate>
   </item>
   <item>
      <id>459927</id>
      <title><![CDATA[龍翔道往荃灣方向，近天馬苑有壞車阻路，龍尾：黃大仙中心。]]></title>
      <time><![CDATA[2017-09-16 HKT 09:06]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 09:06:00 +0800</pubDate>
   </item>
   <item>
      <id>459926</id>
      <title><![CDATA[受爆水管影響，荃灣路往屯門方向，近晉昇工廠大廈快線仍然封閉，龍尾：荔景。]]></title>
      <time><![CDATA[2017-09-16 HKT 08:55]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 08:55:00 +0800</pubDate>
   </item>
   <item>
      <id>459923</id>
      <title><![CDATA[告士打道西行往紅隧，龍尾：景隆街。]]></title>
      <time><![CDATA[2017-09-16 HKT 08:40]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 08:40:00 +0800</pubDate>
   </item>
   <item>
      <id>459922</id>
      <title><![CDATA[較早前紅磡海底隧道往九龍方向，近管道出口慢線的交通意外已清理，車龍有待消散。]]></title>
      <time><![CDATA[2017-09-16 HKT 08:26]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 08:26:00 +0800</pubDate>
   </item>
   <item>
      <id>459920</id>
      <title><![CDATA[紅磡海底隧道往九龍方向，近管道出口慢線有交通意外，一帶擠塞。]]></title>
      <time><![CDATA[2017-09-16 HKT 08:12]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 08:12:00 +0800</pubDate>
   </item>
   <item>
      <id>459919</id>
      <title><![CDATA[受爆水管影響，荃灣路往屯門方向，近晉昇工廠大廈快線封閉，龍尾：興芳路。]]></title>
      <time><![CDATA[2017-09-16 HKT 08:10]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 08:10:00 +0800</pubDate>
   </item>
   <item>
      <id>459917</id>
      <title><![CDATA[紅磡海底隧道港島往九龍方向，管道內曾有壞車阻路，現已拖走，龍尾：灣仔運動場。]]></title>
      <time><![CDATA[2017-09-16 HKT 07:58]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 07:58:00 +0800</pubDate>
   </item>
   <item>
      <id>459916</id>
      <title><![CDATA[較早前因受爆水管而封閉的水坑口街唯一行車線重開。]]></title>
      <time><![CDATA[2017-09-16 HKT 07:45]]></time>
      <link><![CDATA[http://rthk.hk/trafficnews/index.htm]]></link>
      <description />
      <pubDate>Sat, 16 Sep 2017 07:45:00 +0800</pubDate>
   </item>
</channel>
`
