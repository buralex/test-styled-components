
import * as types from './constants/types';

const initialState = {
    test: '',
};

function userSettingsReducer(state = initialState, action) {
    switch (action.type) {
        // case types.HIDE_LOADER: {
        //     // const enqTypes = action.payload.data || [];
        //     // console.log(enqTypes);
        //     // return {
        //     //     ...state,
        //     //     test: enqTypes,
        //     // };
        // }

        default:
            return state;
    }
}

export default userSettingsReducer;
