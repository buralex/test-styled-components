
import {fromJS} from 'immutable';

import * as types from './constants';

// The initial state of the App
const initialState = fromJS({
    isLoggedIn: false,
    loading: false,
    error: false,
    currentUser: false,
    authKey: '',
    userData: {},
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_LOADER:
            return state.set('loading', true);

        case types.HIDE_LOADER:
            return state.set('loading', false);

        case types.SERVER_ERROR:
            return state.set('error', action.payload).set('loading', false);

        case types.CLEAR_SERVER_ERROR:
            return state.set('error', false);

        case types.LOGIN:
            return state.set('loading', true);

        case types.LOGIN_SUCCESS: {
            const {token, user} = action.payload.data || {};

            return state
                .set('userData', user)
                .set('authKey', token)
                .set('isLoggedIn', true)
                .set('loading', false);
        }

        default:
            return state;
    }
}

export default appReducer;
