/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {combineReducers} from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as signalReducer } from 'redux-signal';
import storage from 'redux-persist/lib/storage'

import globalReducer from 'containers/App/reducers/global';
import routeReducer from 'containers/App/reducers/route';
import userDataReducer from 'containers/App/reducers/userDataReducer';
import userSettingsReducer from 'containers/App/reducers/userSettingsReducer';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import enquiryReducer from 'containers/Enquiry/reducer';
import servicesReducer from 'containers/Services/reducer';
import {persistReducer} from "redux-persist";


export default combineReducers({
    route: routeReducer,
    global: globalReducer,
    userData: persistReducer({key: 'userData', storage}, userDataReducer),
    userSettings: persistReducer({key: 'userSettings', storage}, userSettingsReducer),
    language: languageProviderReducer,
    enquiry: enquiryReducer,
    services: servicesReducer,

    form: reduxFormReducer,
    signal: signalReducer,
});
