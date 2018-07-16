

import {call, put, select, all, takeLatest} from 'redux-saga/effects';
import {fetchEnquiryTypes, postToSupport, fetchCategories} from "services/api";
import { history } from 'app';
import omit from 'lodash/omit';
import {createSelector} from "reselect";
import * as appActions from 'containers/App/actions';

import * as types from './constants/types';
import {FIELDS as db} from './constants/fields';

/**
 * Load enquiry types
 */
export function* loadCategories() {
    try {
        yield put(appActions.showLoader());

        const data = yield fetchCategories().then(res => res.data);

        console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf');
        console.log(data);

        yield put({
            type: types.LOAD_CATEGORIES_SUCCESS,
            payload: data,
        });

        yield put(appActions.hideLoader());

    } catch (e) {
        yield put(appActions.serverError(e));
    }
}
export function* watchLoadCategories() {
    yield takeLatest(types.LOAD_CATEGORIES, loadCategories);
}


// /**
//  * Post enquiry
//  */
// export function* postEnquiry(action) {
//     let values = action.payload;
//
//     if (values[db.other_enquiry_type]) {
//         // replace enquiry with other and delete other prop
//         values = omit(
//             {...values, [db.enquiry_type]: values[db.other_enquiry_type]},
//             [db.other_enquiry_type]
//         );
//     }
//
//     try {
//         yield put(appActions.showLoader());
//
//         const data = yield postToSupport(values).then(res => res.data);
//
//         yield put(appActions.serverSuccess(data));
//
//     } catch (e) {
//         yield put(appActions.serverError(e));
//     }
// }
// export function* watchPostEnquiry() {
//     yield takeLatest(types.POST_ENQUIRY, postEnquiry);
// }


/**
 * Watcher
 */
export default function* saga() {
    yield all([
        watchLoadCategories(),
        //watchPostEnquiry(),
    ])
}
