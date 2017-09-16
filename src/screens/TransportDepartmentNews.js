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
import isEmpty from "lodash/isEmpty"

class TransportDepartmentNews extends Component {
    state = {
        refreshing: false,
    }

    componentDidMount() {
        parseString(xml, { trim: true }, (err, result) => {
            if (err) {
                console.error("Parse XML error", err)
                return
            }
            // console.log("Parse XML result", result)
            this.parseNews(result)
        })
    }

    parseNews(jObject) {
        let messageObjects = jObject.body.message
        let messages = messageObjects
            .map((object) => (
                {
                    key: object.msgID,
                    details: object.ChinText[0],
                    date: object.ReferenceDate,
                }
            ))
            .filter(message => !isEmpty(message))

        this.setState({
            messages: messages,
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
                    data={this.state.messages}
                    renderItem={({ item, index }) => (
                        <ListItemView data={this.state.messages} index={index}>
                            <ListItem 
                                details={item.details}
                                detailsStyle={{color: "black", fontSize: 16,}}
                                date={moment(item.date, "YYYY/M/D a HH:mm:ss").tz("Asia/Shanghai")}
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

export default TransportDepartmentNews;

// http://resource.data.one.gov.hk/td/en/specialtrafficnews.xml
const xml = `
 <?xml version='1.0' encoding='utf-8'?>
 <body xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:schemaLocation='http://data.one.gov.hk/td http://data.one.gov.hk/xsd/td/specialtrafficnews.xsd' xmlns='http://data.one.gov.hk/td'>
 <message>
                    <msgID>36841</msgID>
                    <CurrentStatus>2</CurrentStatus>
                    <ChinText>為配合高鐵香港段西九龍站的道路改善工程，柯士甸道西與連翔道交界的地下行車道系統會分階段開通。其中第一階段，即由明日(九月十七日)上午七時起，開通部分柯士甸道西第一層的地下行車道，而近港鐵九龍站的柯士甸道西西面環迴路亦會開通。屆時:  1.目前使用柯士甸道西地面行車路的車輛，將改行新建的第一層地下行車道，來往尖沙咀/港鐵九龍站一帶； 2.來往港鐵九龍站部分上蓋屋苑或商場停車場的車輛，將由現時的地面臨時路，改行柯士甸道西西面環迴路。  運輸署提醒駕駛人士，當駛經有關路段時，要留意現場設置的交通標誌，小心駕駛。</ChinText>
                    <ChinShort>為配合高鐵香港段西九龍站的道路改善工程，柯士甸道西與連翔道交界的地下行車道系統會分階段開通。其中第一階段，即由明日(九月十七日)上午七時起，開通部分柯士甸道西第一層的地下行車道，而近港鐵九龍站的柯士甸道西西面環迴路亦會開通。屆時:  1.目前使用柯士甸道西地面行車路的車輛，將改行新建的第一層地下行車道，來往尖沙咀/港鐵九龍站一帶； 2.來往港鐵九龍站部分上蓋屋苑或商場停車場的車輛，將由現時的地面臨時路，改行柯士甸道西西面環迴路。  運輸署提醒駕駛人士，當駛經有關路段時，要留意現場設置的交通標誌，小心駕駛。</ChinShort>
                    <EngText>To facilitate road improvement works near West Kowloon Station, the underpass at the junction of Austin Road West and Lin Cheung Road will be opened for public use in stages.  In stage 1, i. e. from 7. 00 a. m. tomorrow (17 September 2017), part of the first level of Austin Road West Underpass and the western loop road adjacent to the MTR Kowloon Station will be opened for public use.  At that time:    1. Vehicles heading for Tsim Sha Tsui/ MTR Kowloon Station using the at- grade Austin Road West will be diverted to use the first level of the underpass; and    2. Vehicles to /from the car park of estates and mall atop MTR Kowloon Station using the at-grade temporary road will be diverted to use the western loop road of Austin Road West.    The Transport Department reminds drivers to be alert and pay attention to the traffic signs on site when driving pass the above road sections.</EngText>
                    <EngShort>To facilitate road improvement works near West Kowloon Station, the underpass at the junction of Austin Road West and Lin Cheung Road will be opened for public use in stages.  In stage 1, i. e. from 7. 00 a. m. tomorrow (17 September 2017), part of the first level of Austin Road West Underpass and the western loop road adjacent to the MTR Kowloon Station will be opened for public use.  At that time:    1. Vehicles heading for Tsim Sha Tsui/ MTR Kowloon Station using the at- grade Austin Road West will be diverted to use the first level of the underpass; and    2. Vehicles to /from the car park of estates and mall atop MTR Kowloon Station using the at-grade temporary road will be diverted to use the western loop road of Austin Road West.    The Transport Department reminds drivers to be alert and pay attention to the traffic signs on site when driving pass the above road sections.</EngShort>
                    <ReferenceDate> 2017/9/16 上午 07:20:43</ReferenceDate>
                    <IncidentRefNo></IncidentRefNo>
                    <CountofDistricts>0</CountofDistricts>
                    <ListOfDistrict>
                    </ListOfDistrict>
                </message>
                <message>
                    <msgID>36840</msgID>
                    <CurrentStatus>3</CurrentStatus>
                    <ChinText>為配合最後一個階段的獅子山隧道九龍出口的道路維修工程，獅子山隧道(九龍方向)由其收費廣場起，至其九龍出口的慢線，將於今天晚上11時至下星期一（9月18日）凌晨4時30分期間臨時封閉。  運輸署預計獅子山隧道往九龍方向的交通將於上述時段非常擠塞。行經有關路段的駕駛人士請保持忍讓及小心駕駛。  駕駛人士亦可考慮使用其他道路，如八號幹線(青沙公路)、城門隧道、大埔道或大老山隧道前往九龍。  使用公共運輸服務的市民，請儘量使用鐵路服務或途經八號幹線(青沙公路)、城門隧道、大埔道或大老山隧道的巴士服務前往九龍，預早計劃行程及預留充足的旅程時間，以免受到延誤。  市民請留意傳媒廣播的最新交通消息。有關的特別交通安排詳情已上載運輸署網頁(www.td.gov.hk)。</ChinText>
                    <ChinShort>為配合最後一個階段的獅子山隧道九龍出口的道路維修工程，獅子山隧道(九龍方向)由其收費廣場起，至其九龍出口的慢線，將於今天晚上11時至下星期一（9月18日）凌晨4時30分期間臨時封閉。  運輸署預計獅子山隧道往九龍方向的交通將於上述時段非常擠塞。行經有關路段的駕駛人士請保持忍讓及小心駕駛。  駕駛人士亦可考慮使用其他道路，如八號幹線(青沙公路)、城門隧道、大埔道或大老山隧道前往九龍。  使用公共運輸服務的市民，請儘量使用鐵路服務或途經八號幹線(青沙公路)、城門隧道、大埔道或大老山隧道的巴士服務前往九龍，預早計劃行程及預留充足的旅程時間，以免受到延誤。  市民請留意傳媒廣播的最新交通消息。有關的特別交通安排詳情已上載運輸署網頁(www.td.gov.hk)。</ChinShort>
                    <EngText>To facilitate the final phase of road repair works at the Kowloon exit of Lion Rock Tunnel, the slow lane of Lion Rock Tunnel (Kowloon bound) from its toll plaza to Kowloon exit will be temporarily closed to all vehicular traffic from 11.00 pm tonight to 4.30 am on next Monday (18 September).    The Transport Department anticipates that the traffic at Lion Rock Tunnel Kowloon bound during the above period will be very congested. Motorists passing through the road section concerned are advised to be patient and drive with utmost care.    Motorists are also advised to consider using alternative routes such as Route 8 (Tsing Sha Highway), Shing Mun Tunnels, Tai Po Road or Tate’s Cairn Tunnel to Kowloon.    Commuters taking public transport services are advised to use railway services or bus services via Route 8 (Tsing Sha Highway), Shing Mun Tunnels, Tai Po Road or Tate’s Cairn Tunnel to Kowloon. Early planning of journeys to allow more travelling time is also advised to avoid unexpected delay.    Members of the public are advised to watch out for the latest traffic news through the media. Details of the special traffic arrangement are now available on the TD&apos;s website (www.td.gov.hk).</EngText>
                    <EngShort>To facilitate the final phase of road repair works at the Kowloon exit of Lion Rock Tunnel, the slow lane of Lion Rock Tunnel (Kowloon bound) from its toll plaza to Kowloon exit will be temporarily closed to all vehicular traffic from 11.00 pm tonight to 4.30 am on next Monday (18 September).    The Transport Department anticipates that the traffic at Lion Rock Tunnel Kowloon bound during the above period will be very congested. Motorists passing through the road section concerned are advised to be patient and drive with utmost care.    Motorists are also advised to consider using alternative routes such as Route 8 (Tsing Sha Highway), Shing Mun Tunnels, Tai Po Road or Tate’s Cairn Tunnel to Kowloon.    Commuters taking public transport services are advised to use railway services or bus services via Route 8 (Tsing Sha Highway), Shing Mun Tunnels, Tai Po Road or Tate’s Cairn Tunnel to Kowloon. Early planning of journeys to allow more travelling time is also advised to avoid unexpected delay.    Members of the public are advised to watch out for the latest traffic news through the media. Details of the special traffic arrangement are now available on the TD&apos;s website (www.td.gov.hk).</EngShort>
                    <ReferenceDate> 2017/9/16 上午 07:20:43</ReferenceDate>
                    <IncidentRefNo></IncidentRefNo>
                    <CountofDistricts>0</CountofDistricts>
                    <ListOfDistrict>
                    </ListOfDistrict>
                </message>
                <message>
                    <msgID>36839</msgID>
                    <CurrentStatus>3</CurrentStatus>
                    <ChinText>因水管爆裂，昌榮路往和宜合道方向近同珍工業大廈的部份行車線仍然封閉。
 駕駛人士只可使用餘下行車線行車。

 ********************
 運輸署現已推出《交通快訊》流動應用程式發布最新的交通消息。
 如遇重要事故，將同步透過《香港政府通知你》發出通知。請前往Google Play或App Store下載。</ChinText>
                    <ChinShort>因水管爆裂，昌榮路往和宜合道方向近同珍工業大廈的部份行車線仍然封閉。
 駕駛人士只可使用餘下行車線行車。

 ********************
 運輸署現已推出《交通快訊》流動應用程式發布最新的交通消息。
 如遇重要事故，將同步透過《香港政府通知你》發出通知。請前往Google Play或App Store下載。</ChinShort>
                    <EngText>Due to watermain burst, part of the lanes of Cheung Wing Road Wo Yi Hop Road bound near Tung Chun Industrial Building are still closed to all traffic.
 Only remaining lanes are still available to motorists.

 ********************
 Transport Department has launched the &quot;eTraffic News&quot; mobile application for disseminating the latest traffic news.
 For major incidents, messages will also be sent through &quot;GovHK Notifications&quot;. Please download it from Google Play or App Store.</EngText>
                    <EngShort>Due to watermain burst, part of the lanes of Cheung Wing Road Wo Yi Hop Road bound near Tung Chun Industrial Building are still closed to all traffic.
 Only remaining lanes are still available to motorists.

 ********************
 Transport Department has launched the &quot;eTraffic News&quot; mobile application for disseminating the latest traffic news.
 For major incidents, messages will also be sent through &quot;GovHK Notifications&quot;. Please download it from Google Play or App Store.</EngShort>
                    <ReferenceDate> 2017/9/16 上午 07:20:43</ReferenceDate>
                    <IncidentRefNo></IncidentRefNo>
                    <CountofDistricts>0</CountofDistricts>
                    <ListOfDistrict>
                    </ListOfDistrict>
                </message>
                <message>
                    <msgID>36835</msgID>
                    <CurrentStatus>3</CurrentStatus>
                    <ChinText>為配合道路改善工程，由2017年9月24日上午1時30分起，連接太子道東(東行)及協調道的高架道路將會封閉，禁止所有車輛駛入。因應上述道路封閉，當局將分別於2017年9月17日及2017年9月24日，實施交通及運輸安排。市民請致電1823電話中心或瀏覽運輸署網頁www.td.gov.hk，以獲取交通及運輸安排詳情。</ChinText>
                    <ChinShort>為配合道路改善工程，由2017年9月24日上午1時30分起，連接太子道東(東行)及協調道的高架道路將會封閉，禁止所有車輛駛入。因應上述道路封閉，當局將分別於2017年9月17日及2017年9月24日，實施交通及運輸安排。市民請致電1823電話中心或瀏覽運輸署網頁www.td.gov.hk，以獲取交通及運輸安排詳情。</ChinShort>
                    <EngText>In order to facilitate the road improvement works, the elevated road connecting Prince Edward Road East eastbound and Concorde Road will be closed to all vehicular traffic with effect from 1:30 a.m. on 24 September 2017.  In connection with the above road closure, traffic and transport arrangements will be implemented on 17 September 2017 and 24 September 2017 respectively. Members of the public please call 1823 or visit Transport Department webpage www.td.gov.hk to obtain the details of the traffic and transport arrangements.</EngText>
                    <EngShort>In order to facilitate the road improvement works, the elevated road connecting Prince Edward Road East eastbound and Concorde Road will be closed to all vehicular traffic with effect from 1:30 a.m. on 24 September 2017.  In connection with the above road closure, traffic and transport arrangements will be implemented on 17 September 2017 and 24 September 2017 respectively. Members of the public please call 1823 or visit Transport Department webpage www.td.gov.hk to obtain the details of the traffic and transport arrangements.</EngShort>
                    <ReferenceDate> 2017/9/16 上午 07:20:43</ReferenceDate>
                    <IncidentRefNo></IncidentRefNo>
                    <CountofDistricts>0</CountofDistricts>
                    <ListOfDistrict>
                    </ListOfDistrict>
                </message>
 </body> 
 `
