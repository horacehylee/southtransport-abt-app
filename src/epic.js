import { combineEpics } from 'redux-observable'
import { tunnelTimeEpics } from "./modules/tunnelTime"
console.log("tunnelTimeEpics", tunnelTimeEpics)

export const rootEpic = combineEpics(
    tunnelTimeEpics
);