
import {
    // call, select,
    put, all, takeLatest,
} from 'redux-saga/effects';

import {fetchCategories} from "services/api";

import * as appActions from 'containers/App/actions';

import * as types from './constants/types';


/**
 * Load enquiry types
 */
export function* loadCategories() {
    try {
        yield put(appActions.showLoader());

        const data = yield fetchCategories().then(res => res.data);

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


/**
 * Watcher
 */
export default function* saga() {
    yield all([
        watchLoadCategories(),
    ])
}
