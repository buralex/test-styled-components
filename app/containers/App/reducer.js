/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {fromJS} from 'immutable';

import {LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR} from './constants';
import * as types from './constants';

// The initial state of the App
const initialState = fromJS({
    isLoggedIn: false,
    loading: false,
    error: false,
    currentUser: false,
    userData: {
        repositories: false,
    },
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_LOADER:
            return state.set('loading', true);

        case types.HIDE_LOADER:
            return state.set('loading', false);

        case types.SERVER_ERROR:
            return state.set('error', action.error).set('loading', false);

        case types.LOGIN:
            console.log('reducer LOGIN');
            return state
                .set('loading', true)
                .set('error', false)
                .setIn(['userData', 'repositories'], false);

        case types.LOGIN_SUCCESS:
            return state.set('isLoggedIn', true);



        case LOAD_REPOS:
            return state
                .set('loading', true)
                .set('error', false)
                .setIn(['userData', 'repositories'], false);
        case LOAD_REPOS_SUCCESS:
            return state
                .setIn(['userData', 'repositories'], action.repos)
                .set('loading', false)
                .set('currentUser', action.username);
        case LOAD_REPOS_ERROR:
            return state.set('error', action.error).set('loading', false);

        default:
            return state;
    }
}

export default appReducer;
