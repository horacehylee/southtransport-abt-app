import isEmpty from "lodash/isEmpty"
import moment from "moment-timezone"
require("moment/locale/zh-hk")

export const parseNews = (jObject) => {
    let messageObjects = jObject.body.message
    let messages = messageObjects
        .map((object) => (
            {
                key: object.msgID,
                details: object.ChinText[0],
                date: moment(object.ReferenceDate, "YYYY/M/D a HH:mm:ss").tz("Asia/Shanghai"),
            }
        ))
        .filter(message => !isEmpty(message))

    return {
        messages: messages,
    }
}