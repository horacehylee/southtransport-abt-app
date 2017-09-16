import moment from "moment-timezone"
require("moment/locale/zh-hk")
import { checkTimeWithin12Hours } from "./checkTimeWithin"

const getTimeAgo = (momentDate) => {
    let timeFormat = "ah時mm分"
    if (checkTimeWithin12Hours(momentDate)) {
        return `${momentDate.fromNow()} - ${momentDate.format(timeFormat)}`
    } else {
        return momentDate.format(`YYYY年MoDo - ${timeFormat}`)
    }
}

export default getTimeAgo