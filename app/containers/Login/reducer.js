
import {fromJS} from 'immutable';

// import * as types from './constants/types';

export const initialState = fromJS({

});

function loginReducer(state = initialState, action) {
    switch (action.type) {

        default:
            return state;
    }
}

export default loginReducer;
