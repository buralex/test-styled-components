import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

import LoadingIndicator from 'components/LoadingIndicator';

const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
    authenticatedSelector: state => state.userData.authKey !== null,
    authenticatingSelector: state => state.app.loading,
    wrapperDisplayName: 'UserIsAuthenticated',
}

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
    ...userIsAuthenticatedDefaults,
    AuthenticatingComponent: LoadingIndicator,
    redirectPath: '/login',
})

export const userIsAdminRedir = connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: state => state.userData.authKey !== null
    && state.userData.isAdmin,
    predicate: user => user.get('isAdmin'),
    wrapperDisplayName: 'UserIsAdmin',
})

const userIsNotAuthenticatedDefaults = {
    // Want to redirect the user when they are done loading and authenticated
    authenticatedSelector: state => state.userData.authKey === null,
    wrapperDisplayName: 'UserIsNotAuthenticated',
}

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
    ...userIsNotAuthenticatedDefaults,
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/services',
    allowRedirectBack: false,
})
