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
import ListDivider from "./../components/ListDivider"
import { Theme } from "./../theme"
import isEmpty from "lodash/isEmpty"
import renderIf from "./../utils/renderIf"

const mapNodeToDateTime = (node) => {
	let date = node.$.date
	let time = node.$.time
	return moment(`${date}T${time}`).tz("Asia/Shanghai")
}

const checkTimeWithin = hours => inputDateTime => {
	let currentMoment = moment();
	let inputMoment = moment(inputDateTime);
	return currentMoment.diff(inputDateTime, 'h') <= hours;
}

const checkTimeWithin12Hours = checkTimeWithin(12)

class CommericalRadioNews extends Component {
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
		let news = jObject.news.newsclip.map((node) => (
			{
				key: node.$.id,
				title: node.title[0],
				details: node.content[0],
				date: mapNodeToDateTime(node),
			}
		))

		this.setState({
			news: news,
		})
	}

	getItemDateString(date) {
		let timeFormat = "ah時mm分"
		if (checkTimeWithin12Hours(date)) {
			return `${date.fromNow()} - ${date.format(timeFormat)}`
		} else {
			return date.format(`YYYY年MoDo - ${timeFormat}`)
		}
	}

	refresh() {

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
					data={this.state.news}
					renderItem={({ item, index }) => (
						<ListItemView data={this.state.news} index={index}>
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
										<Text style={styles.itemDate}>{this.getItemDateString(item.date)}</Text>
									</View>
								</View>
							</View>
							<ListDivider data={this.state.news} index={index} />
						</ListItemView>
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
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

export default CommericalRadioNews;

//  http://toolbarapi.881903.com/androidapi/hktb/news/traffic.xml
const xml = `
<?xml version="1.0" encoding="utf-8"?>
<news categoryId="461" category_description="交通消息" version="20170916151102">
	<newsclip id="964730" date="2017-09-16" time="13:05" categoryid="1600" thumbnail="" >
		<title><![CDATA[高空墮物︰中環士丹頓街近奧卑利街(13:06清理)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前受到高空墮物影響︰中環士丹頓街近奧卑利街，全線已經重開，交通回復正常。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964730]]></url>
	</newsclip>
	<newsclip id="964725" date="2017-09-16" time="12:22" categoryid="1600" thumbnail="" >
		<title><![CDATA[高空墮物︰中環士丹頓街近奧卑利街(12:23最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】受到高空墮物影響︰中環士丹頓街近奧卑利街，全線暫時封閉。現時奧卑利街的車輛不能轉入士丹頓街。同時超逾5.5公噸的車輛不能由堅道轉入奧卑利街。駕駛人士要留意番。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964725]]></url>
	</newsclip>
	<newsclip id="964721" date="2017-09-16" time="11:54" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外︰鯉魚門道去旺角(11:56清理)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前鯉魚門道去旺角，近茶果嶺道油站中快線的交通意外已經清理，龍尾︰鯉安苑。 同時亦影響將軍澳道去觀塘，車多擠塞，龍尾︰將軍澳電話機樓。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964721]]></url>
	</newsclip>
	<newsclip id="964718" date="2017-09-16" time="11:35" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外︰鯉魚門道去旺角(11:36最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】鯉魚門道去旺角，近茶果嶺道油站中快線有交通意外，龍尾︰匯景花園。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964718]]></url>
	</newsclip>
	<newsclip id="964716" date="2017-09-16" time="11:33" categoryid="1600" thumbnail="" >
		<title><![CDATA[冧樹︰九龍公園徑去油麻地(11:35清理)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前受到冧樹影響︰九龍公園徑去油麻地，近1881對開一段中快線已經重開，交通回復正常。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964716]]></url>
	</newsclip>
	<newsclip id="964708" date="2017-09-16" time="10:24" categoryid="1600" thumbnail="" >
		<title><![CDATA[冧樹︰九龍公園徑去油麻地(10:24最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】受到冧樹影響︰九龍公園徑去油麻地，近1881對開一段中快線暫時封閉，龍尾︰彌敦道。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964708]]></url>
	</newsclip>
	<newsclip id="964700" date="2017-09-16" time="08:59" categoryid="1600" thumbnail="" >
		<title><![CDATA[爆水管︰荃灣路去屯門(08:59跟進)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前受到爆水管影響︰荃灣路去屯門，近晉昇工廠大廈對開一段快線仍然封閉；現時上址車多擠塞，龍尾︰興芳路橋面。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964700]]></url>
	</newsclip>
	<newsclip id="964696" date="2017-09-16" time="08:53" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外︰紅隧過九龍(08:53清理)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前紅隧過九龍，管內慢線的交通意外已經清理，龍尾︰新鴻基中心。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964696]]></url>
	</newsclip>
	<newsclip id="964694" date="2017-09-16" time="08:29" categoryid="1600" thumbnail="" >
		<title><![CDATA[壞車：紅隧過海(08:29清理)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前紅隧過海，管內慢線的壞車已經清理，龍尾︰理工彎位。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964694]]></url>
	</newsclip>
	<newsclip id="964693" date="2017-09-16" time="08:23" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外︰紅隧過九龍(08:23最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】紅隧過九龍，管內慢線有交通意外，龍尾︰華潤大廈。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964693]]></url>
	</newsclip>
	<newsclip id="964688" date="2017-09-16" time="08:00" categoryid="1601" thumbnail="" >
		<title><![CDATA[特別封路：獅隧修路工程(08:00最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】

特別封路：獅隧修路工程

地點：獅隧

活動：修路工程

日期：9月16-18日

封閉時間及道路：


2017/09/16 23:00– 2017/09/18 04:30

受到修路工程影響，獅隧出九龍方向，管內慢線需要暫時封閉。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964688]]></url>
	</newsclip>
	<newsclip id="964690" date="2017-09-16" time="07:55" categoryid="1600" thumbnail="" >
		<title><![CDATA[爆水管︰荃灣路去屯門(07:55最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】受到爆水管影響︰荃灣路去屯門，近晉昇工廠大廈對開一段快線暫時封閉；現時上址車多擠塞，龍尾︰荔景港鐵站。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964690]]></url>
	</newsclip>
	<newsclip id="964686" date="2017-09-16" time="07:50" categoryid="1601" thumbnail="" >
		<title><![CDATA[特別封路：迪士尼10K Weekend Event(07:50最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】

特別封路：迪士尼10K Weekend Event

活動：10K Weekend Even

t 地點：迪士尼

日期：9月16-17日

封閉時間及主要道路：


19:00(16/9) – 12:00(17/9)

迪欣路。


(17/9) 03:00 – 10:30

介乎欣澳道迴旋處與幻想道迴旋處的一段神奇道南行。


(17/9) 03:00 – 11:00

海鳴路及部分欣澳道、神奇道、幻想道。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964686]]></url>
	</newsclip>
	<newsclip id="964685" date="2017-09-16" time="07:45" categoryid="1600" thumbnail="" >
		<title><![CDATA[壞車：紅隧過海(07:45最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】紅隧過海，管內慢線有壞車，龍尾︰理工彎位。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964685]]></url>
	</newsclip>
	<newsclip id="964636" date="2017-09-15" time="20:17" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外︰東區走廊去中環(20:17清理)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前東區走廊去中環，近維園落橋位中線的壞車已經清理。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964636]]></url>
	</newsclip>
	<newsclip id="964637" date="2017-09-15" time="20:00" categoryid="1600" thumbnail="" >
		<title><![CDATA[壞車︰觀塘道去觀塘(20:00清理)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前觀塘道去觀塘，近啟業邨的壞車已經清理，龍尾：星河明居。 ]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964637]]></url>
	</newsclip>
	<newsclip id="964631" date="2017-09-15" time="19:50" categoryid="1600" thumbnail="" >
		<title><![CDATA[壞車：東區走廊去中環(19:50最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】東區走廊去中環，近維園落橋位中線有壞車，龍尾：柯達大廈。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964631]]></url>
	</newsclip>
	<newsclip id="964626" date="2017-09-15" time="19:33" categoryid="1600" thumbnail="" >
		<title><![CDATA[壞車：觀塘道去觀塘(19:33最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】觀塘道去觀塘，近啟業邨有壞車，龍尾：黃大仙中心。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964626]]></url>
	</newsclip>
	<newsclip id="964624" date="2017-09-15" time="19:26" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外︰荃灣路去屯門 (19:26清理)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前荃灣路去屯門，近晉昇工廠大廈的交通意外已經清理。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964624]]></url>
	</newsclip>
	<newsclip id="964621" date="2017-09-15" time="18:50" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外︰荃灣路去屯門 (18:50最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】荃灣路去屯門，近晉昇工廠大廈有交通意外，龍尾：瑪嘉烈醫院。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964621]]></url>
	</newsclip>
	<newsclip id="964611" date="2017-09-15" time="18:08" categoryid="1601" thumbnail="" >
		<title><![CDATA[特別封路：獅隧修路工程9月16-18日(18:08預告)]]></title>
		<content><![CDATA[特別封路：獅隧修路工程                     

地點：獅隧活動：修路工程日期：9月16-18日 封閉時間及道路：2017/09/16 23:00– 2017/09/18 04:30受到修路工程影響，獅隧出九龍方向，管內慢線需要暫時封閉。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964611]]></url>
	</newsclip>
	<newsclip id="964610" date="2017-09-15" time="18:08" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外︰龍翔道去荃灣 (18:08清理)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前龍翔道去荃灣，近摩士泳池快線的交通意外已經清理，龍尾：德福花園；意外同時影響清水灣道去九龍車多擠塞，龍尾：彩雲邨。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964610]]></url>
	</newsclip>
	<newsclip id="964609" date="2017-09-15" time="18:06" categoryid="1601" thumbnail="" >
		<title><![CDATA[特別封路：迪士尼10K Weekend 9月16-17日(18:06預告)]]></title>
		<content><![CDATA[特別封路：迪士尼10K Weekend活動：10K Weekend

地點：迪士尼日期：9月16-17日 封閉時間及主要道路：19:00(16/9) – 12:00(17/9)迪欣路。(17/9) 03:00 – 10:30介乎欣澳道迴旋處與幻想道迴旋處的一段神奇道南行。(17/9) 03:00 – 11:00海鳴路及部分欣澳道、神奇道、幻想道。 ]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964609]]></url>
	</newsclip>
	<newsclip id="964608" date="2017-09-15" time="18:00" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外：龍翔道去荃灣(18:00跟進)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前龍翔道去荃灣，近摩士泳池快線的交通意外仍未清理，龍尾：德福花園；意外同時影響清水灣道去九龍車多擠塞，龍尾：彩雲邨。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964608]]></url>
	</newsclip>
	<newsclip id="964604" date="2017-09-15" time="17:30" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外︰龍翔道去荃灣 (17:30最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】龍翔道去荃灣，近摩士泳池快線有交通意外，龍尾：德福花園。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964604]]></url>
	</newsclip>
	<newsclip id="964603" date="2017-09-15" time="17:15" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外︰太子道西去旺角(17:15清理)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前太子道西去旺角，近基堤道快線的交通意外已經清理。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964603]]></url>
	</newsclip>
	<newsclip id="964598" date="2017-09-15" time="17:03" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外：太子道西去旺角(17:03跟進)]]></title>
		<content><![CDATA[【馬路的事交通消息】較早前太子道西去旺角，近基堤道快線的交通意外仍未清理，龍尾：譽港灣。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964598]]></url>
	</newsclip>
	<newsclip id="964596" date="2017-09-15" time="16:42" categoryid="1600" thumbnail="" >
		<title><![CDATA[交通意外：太子道西去旺角(16:42最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】太子道西去旺角，近基堤道快線有交通意外，龍尾：九龍醫院。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964596]]></url>
	</newsclip>
	<newsclip id="964568" date="2017-09-15" time="15:40" categoryid="1600" thumbnail="" >
		<title><![CDATA[爆水管︰ 上環水坑口街 (15:40最新)]]></title>
		<content><![CDATA[【馬路的事交通消息】受爆水管影響，上環水坑口街唯一行車線需要暫時封閉，車輛現時不能由皇后大道西左轉入水坑口街，駕駛人士請留意。]]></content>
		<url><![CDATA[http://www.881903.com/page/zh-tw/newsdetail.aspx?ItemId=964568]]></url>
	</newsclip>
</news>
`