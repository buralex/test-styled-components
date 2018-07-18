import * as types from './constants/types';

// The initial state of the App
export const initialState = {
    categories: [],
};

function servicesReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_CATEGORIES_SUCCESS: {
            const categories = action.payload.data || [];

            return {
                ...state,
                categories,
            };
        }


        default:
            return state;
    }
}

export default servicesReducer;
