import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from "./reducer"
import { middlewares } from "./middlewares"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        // applyMiddleware(...middleware)
        composeEnhancers(applyMiddleware(...middlewares))
    );
}