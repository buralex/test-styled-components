
import {LOCATION_CHANGE} from 'react-router-redux';

/*
 * routeReducer
 *
 * The reducer merges route location changes into state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = {
    location: null,
};

/**
 * Merge route into the application state
 */
export function routeReducer(state = routeInitialState, action) {
    switch (action.type) {
        /* istanbul ignore next */
        case LOCATION_CHANGE:
            return {
                ...state,
                location: action.payload,
            };

        default:
            return state;
    }
}

export default routeReducer;
