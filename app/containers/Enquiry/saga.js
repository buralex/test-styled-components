/**
 * Gets the repositories of the user from Github
 */

import {call, put, select, all, takeLatest} from 'redux-saga/effects';
import {fetchEnquiryTypes, postToSupport, fetchDirectories} from "services/api";
import { history } from 'app';
import {createSelector} from "reselect";
import * as appActions from 'containers/App/actions';

import * as types from './constants/types';
import {FIELDS as db} from './constants/fields';


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
        let values = action.payload;

        // if (values.get(db.enquiry_type) === 'Other' && values.get(db.other_enquiry_type)) {
        //     fieldValues = values.set(db.enquiry_type, values.get(db.other_enquiry_type));
        // } else {
        //     fieldValues = values;
        // }
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', values.toJS());
        if (values.get(db.other_enquiry_type)) {
            values = values.set(db.enquiry_type, values.get(db.other_enquiry_type))
                .delete(db.other_enquiry_type);
        }

        try {
            yield put(appActions.showLoader());

            const data = yield postToSupport(values.toJS()).then(res => res.data);

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
