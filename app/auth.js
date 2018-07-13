import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

//import Loading from './components/Loading'
import LoadingIndicator from 'components/LoadingIndicator';

const locationHelper = locationHelperBuilder({});

if (window.__app_store__) {
    console.log(window.__app_store__.getState().global.userData.authKey);
}

const userIsAuthenticatedDefaults = {
    authenticatedSelector: state => state.global.userData.authKey !== null,
    authenticatingSelector: state => state.global.loading,
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
    authenticatedSelector: state => state.global.userData.authKey !== null
    && state.global.userData.isAdmin,
    predicate: user => user.get('isAdmin'),
    wrapperDisplayName: 'UserIsAdmin',
})

const userIsNotAuthenticatedDefaults = {
    // Want to redirect the user when they are done loading and authenticated
    authenticatedSelector: state => state.global.userData.authKey === null
        && state.global.loading === false,
    wrapperDisplayName: 'UserIsNotAuthenticated',
}

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
    ...userIsNotAuthenticatedDefaults,
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/service-categories',
    allowRedirectBack: false,
})
