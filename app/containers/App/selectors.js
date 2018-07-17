/**
 * The app state selectors
 */

import {createSelector} from 'reselect';

export const selectApp = state => state.app;
export const selectRoute = state => state.route;
export const selectUserData = state => state.userData;

export const makeSelectCurrentUser = () => createSelector(selectApp, app => app.userData.user);

export const makeSelectLoading = () => createSelector(selectApp, app => app.loading);

export const makeSelectAlert = () => createSelector(selectApp, app => app.alert);

export const makeSelectSuccess = () => createSelector(selectApp, app => app.success);

export const makeSelectIsLoggedIn = () => createSelector(selectUserData, userData => userData.authKey !== null);

export const makeSelectLocation = () => createSelector(selectRoute, routeState => routeState.location);

export const makeSelectIsAbout = () =>
    createSelector(selectRoute, routeState => routeState.location.pathname.includes('about'));

