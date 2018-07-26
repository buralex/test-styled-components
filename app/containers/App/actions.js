
import * as modalNames from 'components/modals/names';
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
 * Logout
 */
export function logout() {
    return {
        type: types.LOGOUT,
    };
}

/**
 * Show alert
 */
export function showAlert(modalName, data) {
    return {
        type: types.SHOW_ALERT,
        payload: {
            modalName,
            data,
        },
    };
}

/**
 * Hide alert
 */
export function hideAlert() {
    return {
        type: types.HIDE_ALERT,
    };
}


/* ------------------------------- server events --------------------------------- */
/**
 * Server error
 */
export function serverError(error) {
    return showAlert(modalNames.SERVER_ERROR, (error && error.data.error) || error);
}

/**
 * Server success
 */
export function serverSuccess(data) {
    return showAlert(modalNames.SERVER_SUCCESS, data.data || data);
}

/* ------------------------------- / server events --------------------------------- */

/**
 * Load
 */
export function loadSuggestions() {
    return {
        type: types.LOAD_SUGGESTIONS,
    };
}

/**
 * Load
 */
export function loadEnquiryTypes() {
    return {
        type: types.LOAD_ENQUIRY_TYPES,
    };
}

/**
 * Post
 */
export function postEnquiry(values) {
    return {
        type: types.POST_ENQUIRY,
        payload: values,
    };
}
