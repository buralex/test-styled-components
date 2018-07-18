import {call, put, select, all, takeLatest} from 'redux-saga/effects';
import {loginRequest} from "services/api";
import {history} from 'app';


import * as types from './constants/types';

import * as actions from './actions';

/**
 * Login
 */
export function* login(action) {
    const {email, password} = action.payload;

    try {
        yield put(actions.showLoader());

        const data = yield loginRequest({email, password}).then(res => res.data);

        yield put({
            type: types.LOGIN_SUCCESS,
            payload: data,
        });

        yield put(actions.hideLoader());
        yield call(history.push, '/services');

    } catch (e) {
        yield put(actions.serverError(e));
    }
}

export function* watchLogin() {
    yield takeLatest(types.LOGIN, login);
}


/**
 * Watcher
 */
export default function* saga() {
    yield all([
        watchLogin(),
    ])
}
