
import * as types from './constants/types';

export const initialState = {
    enquiryTypes: [],
};

export default function navbarReducer(state = initialState, action) {
    switch (action.type) {

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
