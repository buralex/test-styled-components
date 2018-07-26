

import * as types from './constants/types';


// The initial state of the App
const initialState = {
    loading: false,
    alert: false,
    commonData: {},
    suggestions: {},
    enquiryTypes: [],
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_LOADER:
            return {
                ...state,
                loading: true,
            };

        case types.HIDE_LOADER:
            return {
                ...state,
                loading: false,
            };

        case types.SHOW_ALERT:
            return {
                ...state,
                loading: false,
                alert: {
                    modalName: action.payload.modalName,
                    data: action.payload.data || {},
                },
            };

        case types.HIDE_ALERT:
            return {
                ...state,
                loading: false,
                alert: false,
            };

        case types.LOAD_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                suggestions: action.payload,
            };

        case types.LOAD_ENQUIRY_TYPES_SUCCESS: {
            const enqTypes = action.payload.data || [];

            return {
                ...state,
                enquiryTypes: enqTypes,
            };
        }


        default:
            return state;
    }
}

export default appReducer;
