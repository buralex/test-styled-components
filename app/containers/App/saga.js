
import {call, put, select, all, takeLatest} from 'redux-saga/effects';
import {loginRequest} from "services/api";
import { history } from 'app';


import * as types from './constants/types';

import * as actions from './actions';


export function* login() {
    yield takeLatest(types.LOGIN, function* (action) {
        const {email, password} = action.payload;

        try {
            yield put(actions.showLoader());

            const data = yield loginRequest({ email, password }).then(res => res.data);

            yield put({
                type: types.LOGIN_SUCCESS,
                payload: data,
            });

            yield put(actions.hideLoader());
            yield call(history.push, '/service-categories');

        } catch (e) {
            yield put(actions.serverError(e));
        }
    });
}


/**
 * Watcher
 */
export default function* rootSaga() {
    yield all([
        login(),
    ])
}
