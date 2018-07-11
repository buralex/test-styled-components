/**
 * The global state selectors
 */

import {createSelector} from 'reselect';

const selectGlobal = state => state.global;

const selectRoute = state => state.route;

const makeSelectCurrentUser = () =>
    createSelector(selectGlobal, globalState => globalState.currentUser);

const makeSelectLoading = () =>
    createSelector(selectGlobal, globalState => globalState.loading);

const makeSelectError = () =>
    createSelector(selectGlobal, globalState => globalState.error);

const makeSelectIsLoggedIn = () =>
    createSelector(selectGlobal, globalState => globalState.isLoggedIn);


const makeSelectRepos = () =>
    createSelector(selectGlobal, globalState =>
        globalState.getIn(['userData', 'repositories']),
    );

const makeSelectLocation = () =>
    createSelector(selectRoute, routeState => routeState.get('location').toJS());

export {
    selectGlobal,
    makeSelectCurrentUser,
    makeSelectLoading,
    makeSelectError,
    makeSelectRepos,
    makeSelectLocation,
    makeSelectIsLoggedIn,
};
