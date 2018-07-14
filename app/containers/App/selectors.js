/**
 * The global state selectors
 */

import {createSelector} from 'reselect';

const selectGlobal = state => state.global;
const selectRoute = state => state.route;
const selectUserData = state => state.userData;

const makeSelectCurrentUser = () =>
    createSelector(selectGlobal, globalState => globalState.userData.user);

const makeSelectLoading = () =>
    createSelector(selectGlobal, globalState => globalState.loading);

const makeSelectError = () =>
    createSelector(selectGlobal, globalState => globalState.error);

const makeSelectIsLoggedIn = () =>
    createSelector(selectUserData, userData => userData.authKey !== null);

const makeSelectLocation = () =>
    createSelector(selectRoute, routeState => routeState.location);

export {
    selectGlobal,
    makeSelectCurrentUser,
    makeSelectLoading,
    makeSelectError,
    makeSelectLocation,
    makeSelectIsLoggedIn,
};
