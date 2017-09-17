import moment from "moment-timezone"
require("moment/locale/zh-hk")

const mapNodeToDate = (node) => {
    let splits = node.time[0].split(" HKT ")
    let date = splits[0]
    let time = splits[1]
    return moment(`${date}T${time}`).tz("Asia/Shanghai")
}

export const parseNews = (jObject) => {
    let news = jObject.channel.item.map((node) => (
        {
            key: node.id[0],
            details: node.title[0],
            date: mapNodeToDate(node),
        }
    ))

    return {
        news: news,
    }
}