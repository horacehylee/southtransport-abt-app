import { parseString } from "react-native-xml2js"
import Rx from "rxjs"

// export const parseXML = Rx.Observable.bindCallback(parseString)
export const parseXML = Rx.Observable.bindCallback(parseString, null, Rx.Scheduler.async)