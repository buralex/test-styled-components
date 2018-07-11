
import {fromJS} from 'immutable';

import * as types from './constants';

export const initialState = fromJS({
    isError: false,
});

function loginReducer(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_ERROR:
            return state.set('isError', true);
        default:
            return state;
    }
}

export default loginReducer;
