import { combineReducers } from 'redux-immutable';
import { reducer as tunnelTimeReducer } from "./modules/tunnelTime"
import { reducer as MainReducer } from "./screens/Main"
import { reducer as transportDepartmentNewsReducer } from "./screens/TransportDepartmentNews"
import { reducer as rthkNewsReducer } from "./screens/RTHKNews"
import { reducer as commericalRadioNewsReducer } from "./screens/CommericalRadioNews"
import { reducer as weatherWarningReducer } from "./screens/WeatherWarning"

export const rootReducer = combineReducers({
    main: MainReducer,
    tunnelTime: tunnelTimeReducer,
    transportDepartmentNews: transportDepartmentNewsReducer,
    rthkNews: rthkNewsReducer,
    commericalRadioNews: commericalRadioNewsReducer,
    weatherWarning: weatherWarningReducer,
})