import moment from "moment-timezone"
require("moment/locale/zh-hk")
import striptags from "striptags"

const mapNodeToDate = (node) => {
    let dateString = node.pubDate[0].split(' +0800')[0].split(', ')[1]
    return moment(dateString, "DD MMM YYYY HH:mm:ss", "en").locale("zh-hk")
}

export const parse = (jObject) => {
    console.log("jObject", jObject)
    let weatherWarnings = jObject.rss.channel[0].item.map((node) => (
        {
            key: node.guid[0]._,
            title: node.title[0],
            details: striptags(node.description[0]),
            date: mapNodeToDate(node)
        }
    ))
    return {
        weatherWarnings: weatherWarnings
    }
}