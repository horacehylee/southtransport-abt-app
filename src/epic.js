import { combineEpics } from 'redux-observable'
import { epics as tunnelTimeEpics } from "./modules/tunnelTime"
import { epics as transportDepartmentNewsEpics } from "./screens/TransportDepartmentNews"
import { epics as rthkNewsEpics } from "./screens/RTHKNews"
import { epics as commericalRadioEpics } from "./screens/CommericalRadioNews"
import { epics as weatherWarningEpics } from "./screens/WeatherWarning"

export const rootEpic = combineEpics(
    tunnelTimeEpics,
    transportDepartmentNewsEpics,
    rthkNewsEpics,
    commericalRadioEpics,
    weatherWarningEpics,
);