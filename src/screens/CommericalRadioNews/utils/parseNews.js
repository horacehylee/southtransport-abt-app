import moment from "moment-timezone"
require("moment/locale/zh-hk")

const mapNodeToDateTime = (node) => {
    let date = node.$.date
    let time = node.$.time
    return moment(`${date}T${time}`).tz("Asia/Shanghai")
}

export const parseNews = (jObject) => {
    let news = jObject.news.newsclip.map((node) => (
        {
            key: node.$.id,
            title: node.title[0],
            details: node.content[0],
            date: mapNodeToDateTime(node),
        }
    ))

    return {
        news: news,
    }
}