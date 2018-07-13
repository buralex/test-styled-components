
import * as types from './constants/types';

// The initial state of the App
const initialState = {
    isLoggedIn: false,
    loading: false,
    error: false,
    userData: {
        authKey: null,
        isAdmin: true,
        user: {},
    },
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

        case types.LOGIN_SUCCESS: {
            const {token, user} = action.payload.data || {};

            return {
                ...state,
                userData: {
                    authKey: token,
                    user,
                },
                isLoggedIn: true,
                loading: false,
            };
        }

        default:
            return state;
    }
}

export default appReducer;
