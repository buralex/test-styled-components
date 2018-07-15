

import * as types from './constants/types';

// The initial state of the App
const initialState = {
    loading: false,
    error: false,
    success: false,
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

        case types.SERVER_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case types.CLEAR_SERVER_ERROR:
            return {
                ...state,
                error: false,
                loading: false,
            };

        case types.SERVER_SUCCESS:
            return {
                ...state,
                success: action.payload,
                loading: false,
            };

        case types.CLEAR_SERVER_SUCCESS:
            return {
                ...state,
                success: false,
                loading: false,
            };

        default:
            return state;
    }
}

export default appReducer;
