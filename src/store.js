import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer } from "./reducer"
import { Iterable } from "immutable"
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from "./epic"
import { ajax } from 'rxjs/observable/dom/ajax';

const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
        http: {
            get: ajax.get
        }
    }
});
let middleware = [thunk, epicMiddleware];

const stateTransformer = (state) => {
    if (Iterable.isIterable(state)) return state.toJS();
    else return state;
};
const logger = createLogger({
    stateTransformer,
});

if (__DEV__) {
    const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
    middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
    middleware = [...middleware];
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );
}