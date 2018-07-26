/**
 * The app state selectors
 */

import {createSelector} from 'reselect';

export const selectApp = state => state.app;
export const selectRoute = state => state.route;
export const selectUserData = state => state.userData;
export const selectRouteParams = (state, ownProps) => ownProps.match.params;
export const selectForm = state => state.form || {};

export const makeSelectCurrentUser = () => createSelector(selectApp, app => app.userData.user);

export const makeSelectLoading = () => createSelector(selectApp, app => app.loading);

export const makeSelectAlert = () => createSelector(selectApp, app => app.alert);
export const makeSelectSuggestions = () => createSelector(selectApp, app => app.suggestions);

export const makeSelectAction = () => createSelector(selectRouteParams, params => params.action);

export const makeSelectIsLoggedIn = () => createSelector(selectUserData, userData => userData.authKey !== null);
export const makeSelectUser = () => createSelector(selectUserData, userData => userData.user);

export const makeSelectLocation = () => createSelector(selectRoute, routeState => routeState.location);


export const makeSelectIsLogin = () =>
    createSelector(selectRoute, routeState => routeState.location.pathname.includes('login'));


export const makeSelectCurrentEnqType = () =>
    createSelector(selectForm, form => form.SupportForm && form.SupportForm.values
    && form.SupportForm.values.enquiry_type);

export const makeSelectEnquiryTypes = () =>
    createSelector(selectApp, app => app.enquiryTypes);

