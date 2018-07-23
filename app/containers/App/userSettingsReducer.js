
import * as types from './constants/types';

const initialState = {
    test: '',
};

function userSettingsReducer(state = initialState, action) {
    switch (action.type) {

        case types.LOGOUT: {
            return initialState;
        }

        default:
            return state;
    }
}

export default userSettingsReducer;
