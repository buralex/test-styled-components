/**
 * Gets the repositories of the user from Github
 */

import {call, put, select, all, takeLatest} from 'redux-saga/effects';
import {fetchEnquiryTypes, postToSupport, fetchDirectories} from "services/api";
import { history } from 'app';
import {createSelector} from "reselect";
import * as appActions from 'containers/App/actions';

import * as types from './constants';


export function* loadEnquiryTypes() {
    yield takeLatest(types.LOAD_ENQUIRY_TYPES, function* (action) {
        try {
            yield put(appActions.showLoader());

            const data = yield fetchEnquiryTypes().then(res => res.data);

            yield put({
                type: types.LOAD_ENQUIRY_TYPES_SUCCESS,
                payload: data,
            });

            yield put(appActions.hideLoader());

        } catch (e) {
            yield put(appActions.serverError(e));
        }
    });
}


export function* postEnquiry() {
    yield takeLatest(types.POST_ENQUIRY, function* (action) {
        const values = action.payload;
        if (values.get('enquiry_type') === 'Other') {
            const other = values.get('other_enquiry_type');
            console.log(other);
            values.set('enquiry_type', other)
            console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssss');
        }
        console.log(action.payload.toJS());
        console.log(values.toJS());
        try {
            yield put(appActions.showLoader());

            const data = yield postToSupport(values.toJS()).then(res => res.data);

            console.log(data);

            yield put({
                type: types.POST_ENQUIRY_SUCCESS,
                payload: data,
            });

            yield put(appActions.hideLoader());

        } catch (e) {
            yield put(appActions.serverError(e));
        }
    });
}


/**
 * Watcher
 */
export default function* rootSaga() {
    yield all([
        loadEnquiryTypes(),
        postEnquiry(),
    ])
}
