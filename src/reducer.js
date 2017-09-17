import { combineReducers } from 'redux-immutable';
import { tunnelTimeReducer } from "./modules/tunnelTime"
import { reducer as MainReducer } from "./screens/Main"

export const rootReducer = combineReducers({
    main: MainReducer,
    tunnelTime: tunnelTimeReducer,
})