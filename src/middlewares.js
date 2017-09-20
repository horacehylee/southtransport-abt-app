import { Iterable } from "immutable"
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from "./epic"
import { ajax } from 'rxjs/observable/dom/ajax';
import { createLogger } from 'redux-logger';
// import thunk from 'redux-thunk';

const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
        http: {
            get: ajax.get
        }
    }
});

let middleware = [epicMiddleware];

const stateTransformer = (state) => {
    if (Iterable.isIterable(state)) return state.toJS();
    else return state;
};
const logger = createLogger({
    stateTransformer,
});

if (__DEV__) {
    const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
    middleware = [
        ...middleware,
        reduxImmutableStateInvariant,
        // logger,
    ];
} else {
    middleware = [...middleware];
}

export const middlewares = [
    ...middleware
]