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

import {LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR, OPEN_MODAL, CLOSE_MODAL} from './constants';

// The initial state of the App
const initialState = fromJS({
    isLoggedIn: false,
    loading: false,
    error: false,
    currentUser: false,
    userData: {
        repositories: false,
    },
    modals: [],
});

function appReducer(state = initialState, action) {
    switch (action.type) {
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

        case OPEN_MODAL:
            return state.updateIn(['modals'], arr => arr.push(4))
            // return {
            //     ...state,
            //     modals: state.modals.concat(action.obj)
            // };

        case CLOSE_MODAL:
            return {
                ...state,
                modals: state.modals.filter(item => item.id !== action.obj.id),
            };
        default:
            return state;
    }
}

export default appReducer;
