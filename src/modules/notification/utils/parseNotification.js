import isEmpty from "lodash/isEmpty"
import moment from "moment-timezone"
require("moment/locale/zh-hk")

export const parseNotification = (jObject) => {
    let notificationObjs = jObject.data.notifications
    let notifications = notificationObjs
        .map((object, i) => (
            {
                key: i,
                title: object.title,
                details: object.description,
                date: moment(object.postDate, "YYYY-MM-DDTHH:mm:ss").tz("Asia/Shanghai"),
            }
        ))

    return {
        notifications: notifications,
    }
}