

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

        case types.ERROR:
            return {
                ...state,
                loading: false,
                error: {
                    type: action.payload.type,
                    data: action.payload.data,
                },
            };

        case types.CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                error: false,
            };

        case types.SUCCESS:
            return {
                ...state,
                loading: false,
                success: {
                    type: action.payload.type,
                    data: action.payload.data,
                },
            };

        case types.CLEAR_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
            };

        default:
            return state;
    }
}

export default appReducer;
