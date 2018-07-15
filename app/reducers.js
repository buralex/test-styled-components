/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {combineReducers} from 'redux';
import {LOCATION_CHANGE} from 'react-router-redux';

import appReducer from 'containers/App/reducer';
import userDataReducer from 'containers/App/userDataReducer';
import userSettingsReducer from 'containers/App/userSettingsReducer';
import { reducer as signalReducer } from 'redux-signal';
import { reducer as reduxFormReducer } from 'redux-form';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = {
    location: null,
};

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
    switch (action.type) {
        /* istanbul ignore next */
        case LOCATION_CHANGE:
            return {
                ...state,
                location: action.payload,
            };
        default:
            return state;
    }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
    return combineReducers({
        route: routeReducer,
        app: appReducer,
        userData: userDataReducer,
        userSettings: userSettingsReducer,

        signal: signalReducer,
        form: reduxFormReducer,
        language: languageProviderReducer,
        ...injectedReducers,
    });
}
