
import {CHANGE_USERNAME} from './constants';

// The initial state of the App
export const initialState = {
    username: '',
};

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_USERNAME:
            return state;
        default:
            return state;
    }
}

export default homeReducer;
