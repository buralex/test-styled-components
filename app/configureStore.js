/**
 * Create the store with dynamic reducers
 */

import {createStore, applyMiddleware, compose} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer, {routeReducer} from './reducers';
import languageProviderReducer from "./containers/LanguageProvider/reducer";
import {reducer as reduxFormReducer} from "redux-form";
import { reducer as signalReducer } from 'redux-signal';
import userSettingsReducer from "./containers/App/userSettingsReducer";
import {combineReducers} from "redux";
import globalReducer from "./containers/App/reducer";
import loginred from "containers/Login/reducer";


const sagaMiddleware = createSagaMiddleware();


export default function configureStore(initialState = {}, history) {
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

    // const persistConfig = {
    //     key: 'root',
    //     storage,
    // }
    //
    //const aaa = createReducer();
    //
    // const persistedReducer = persistReducer(persistConfig, aaa)

    const rootReducer = combineReducers({
        route: routeReducer,
        //global: globalReducer,
        global: persistReducer({key: 'global', storage}, globalReducer),
        userSettings: persistReducer({key: 'userSettings', storage}, userSettingsReducer),
        language: languageProviderReducer,
        form: reduxFormReducer,
        signal: signalReducer,
        login: loginred,
    });
    //createReducer(),
    const store = createStore(
        rootReducer,
        //initialState,
        composeEnhancers(...enhancers),
    );
    console.log(store);
    // Extensions
    store.runSaga = sagaMiddleware.run;


    //store.injectedReducers = {}; // Reducer registry
    //store.injectedSagas = {}; // Saga registry

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    // if (module.hot) {
    //     module.hot.accept('./reducers', () => {
    //         store.replaceReducer(createReducer(store.injectedReducers));
    //         console.log('ssssssssssssssss');
    //         console.log(store.getState());
    //     });
    // }

    // eslint-disable-next-line
    window.__app_store__ = store;

    const persistor = persistStore(store);

    return { persistor, store };
}
