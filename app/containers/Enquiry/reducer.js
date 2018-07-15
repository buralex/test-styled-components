
import * as types from './constants/types';

export const initialState = {
    enquiryTypes: [],
};

function enquiryReducer(state = initialState, action) {
    switch (action.type) {

        case types.LOAD_ENQUIRY_TYPES_SUCCESS: {
            const enqTypes = action.payload.data || [];

            return {
                ...state,
                enquiryTypes: enqTypes,
            };
        }

        // case types.POST_ENQUIRY: {
        //     const enqTypes = action.payload.data || [];
        //
        //     return state.set('enquiryTypes', enqTypes);
        // }

        default:
            return state;
    }
}

export default enquiryReducer;
