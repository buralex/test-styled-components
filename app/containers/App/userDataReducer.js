import * as types from './constants/types';

const initialState = {
    authKey: null,
    isAdmin: true,
    user: {},
};

function userDataReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS: {
            const {token, user} = action.payload.data || {};

            return {
                ...state,
                authKey: token,
                user,
            };
        }

        case types.LOGOUT: {
            return initialState;
        }

        default:
            return state;
    }
}

export default userDataReducer;
