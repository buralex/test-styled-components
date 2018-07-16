
import * as types from './constants/types';
import * as appEventTypes from './constants/appEventTypes';


/**
 * Loader show
 */
export function showLoader() {
    return {
        type: types.SHOW_LOADER,
    };
}

/**
 * Loader hide
 */
export function hideLoader() {
    return {
        type: types.HIDE_LOADER,
    };
}

/**
 * Login request
 */
export function login(values) {
    return {
        type: types.LOGIN,
        payload: values,
    };
}

/**
 * Logout
 */
export function logout() {
    return {
        type: types.LOGOUT,
    };
}


/* ------------------------------- server events --------------------------------- */
/**
 * Server error
 */
export function serverError(error) {
    return {
        type: types.ERROR,
        payload: {
            type: appEventTypes.ERROR_SERVER,
            data: (error.response && error.response.data.error) || error,
        },
    };
}

/**
 * Clear server error
 */
export function clearError() {
    return {
        type: types.CLEAR_ERROR,
    };
}

/**
 * Server success
 */
export function serverSuccess(data) {
    return {
        type: types.SUCCESS,
        payload: {
            type: appEventTypes.SUCCESS_SERVER,
            data: data.data || data,
        },
    };
}
/**
 * Clear success
 */
export function clearSuccess() {
    return {
        type: types.CLEAR_SUCCESS,
    };
}
/* ------------------------------- / server events --------------------------------- */
