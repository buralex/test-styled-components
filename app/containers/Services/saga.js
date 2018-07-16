//
//
// import {call, put, select, all, takeLatest} from 'redux-saga/effects';
// import {fetchEnquiryTypes, postToSupport, fetchDirectories} from "services/api";
// import { history } from 'app';
// import omit from 'lodash/omit';
// import {createSelector} from "reselect";
// import * as appActions from 'containers/App/actions';
//
// import * as types from './constants/types';
// import {FIELDS as db} from './constants/fields';
//
// /**
//  * Load enquiry types
//  */
// export function* loadEnquiryTypes() {
//     try {
//         yield put(appActions.showLoader());
//
//         const data = yield fetchEnquiryTypes().then(res => res.data);
//
//         yield put({
//             type: types.LOAD_ENQUIRY_TYPES_SUCCESS,
//             payload: data,
//         });
//
//         yield put(appActions.hideLoader());
//
//     } catch (e) {
//         yield put(appActions.serverError(e));
//     }
// }
// export function* watchLoadEnquiryTypes() {
//     yield takeLatest(types.LOAD_ENQUIRY_TYPES, loadEnquiryTypes);
// }
//
//
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
//
//
// /**
//  * Watcher
//  */
// export default function* saga() {
//     yield all([
//         watchLoadEnquiryTypes(),
//         watchPostEnquiry(),
//     ])
// }
