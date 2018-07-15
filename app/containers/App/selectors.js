/**
 * The app state selectors
 */

import {createSelector} from 'reselect';

export const selectApp = state => state.app;
export const selectRoute = state => state.route;
export const selectUserData = state => state.userData;

export const makeSelectCurrentUser = () =>
    createSelector(selectApp, globalState => globalState.userData.user);

export const makeSelectLoading = () =>
    createSelector(selectApp, globalState => globalState.loading);

export const makeSelectError = () =>
    createSelector(selectApp, globalState => globalState.error);

export const makeSelectIsLoggedIn = () =>
    createSelector(selectUserData, userData => userData.authKey !== null);

export const makeSelectLocation = () =>
    createSelector(selectRoute, routeState => routeState.location);

