import * as types from './constants/types';


// The initial state of the App
const initialState = {
    loading: false,
    alert: false,
    // error: false,
    // success: false,
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_LOADER:
            return {
                ...state,
                loading: true,
            };

        case types.HIDE_LOADER:
            return {
                ...state,
                loading: false,
            };

        case types.SHOW_ALERT:
            return {
                ...state,
                loading: false,
                alert: {
                    modalName: action.payload.modalName,
                    data: action.payload.data,
                },
            };

        case types.HIDE_ALERT:
            return {
                ...state,
                loading: false,
                alert: false,
            };

        // case types.ERROR:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: {
        //             type: action.payload.type,
        //             data: action.payload.data,
        //         },
        //     };
        //
        // case types.CLEAR_ERROR:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: false,
        //     };
        //
        // case types.SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         success: {
        //             type: action.payload.type,
        //             data: action.payload.data,
        //         },
        //     };
        //
        // case types.CLEAR_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         success: false,
        //     };

        default:
            return state;
    }
}

export default appReducer;
