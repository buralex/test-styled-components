
import * as types from './constants';

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
