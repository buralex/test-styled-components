/**
 * Create the store
 */

import {createStore, applyMiddleware, compose} from 'redux';
import { persistStore } from 'redux-persist'


import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';


const sagaMiddleware = createSagaMiddleware();


export default function configureStore(history) {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [sagaMiddleware, routerMiddleware(history)];

    const enhancers = [applyMiddleware(...middlewares)];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle, indent */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable */


    const store = createStore(
        rootReducer,
        composeEnhancers(...enhancers),
    );

    // Extensions
    store.runSaga = sagaMiddleware.run;

    const persistor = persistStore(store);

    return { persistor, store };
}
