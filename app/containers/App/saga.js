/**
 * Gets the repositories of the user from Github
 */

import {call, put, select, takeLatest} from 'redux-saga/effects';
import {fetchFriends, loginRequest} from "services/api";
import { history } from 'app';
import {LOAD_REPOS} from 'containers/App/constants';
import * as types from './constants';
import {reposLoaded, repoLoadingError} from 'containers/App/actions';
import * as appActions from './actions';

import request from 'utils/request';
import {makeSelectUsername} from 'containers/HomePage/selectors';



/**
 * Login request/response handler
 */
export function* tryLogin() {
    // Select username from store
    // const username = yield select(makeSelectUsername());

    try {
        const data = yield loginRequest({
            email:"test@abz.agency",
            password: '123456',
        }).then(res => res.data).catch(e => e.response.data);
        console.log(data);
        yield put(appActions.loginSuccess(data));
        yield call(history.push, '/');
    } catch (err) {
        yield put(appActions.serverError(err));
    }
}

/**
 * Watcher lifecycle
 */
export default function* loginData() {
    yield takeLatest(types.LOGIN, tryLogin);
}
