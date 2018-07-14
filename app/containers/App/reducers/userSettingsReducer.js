
import * as types from '../constants/types';

const initialState = {
    test: '',
};

function userSettingsReducer(state = initialState, action) {
    switch (action.type) {
        case 'test/Enquiry/LOAD_ENQUIRY_TYPES_SUCCESS': {
            const enqTypes = action.payload.data || [];
            console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
            console.log(enqTypes);
            return {
                ...state,
                test: enqTypes,
            };
        }

        default:
            return state;
    }
}

export default userSettingsReducer;
