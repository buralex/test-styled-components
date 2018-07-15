
import * as types from './constants/types';


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
 * Server error
 */
export function serverError(error) {
    return {
        type: types.SERVER_ERROR,
        payload: (error.response && error.response.data.error) || error,
    };
}

/**
 * Clear server error
 */
export function clearServerError() {
    return {
        type: types.CLEAR_SERVER_ERROR,
    };
}
