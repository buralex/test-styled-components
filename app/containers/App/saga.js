/**
 * Gets the repositories of the user from Github
 */

import {call, put, select, all, takeLatest} from 'redux-saga/effects';
import {fetchFriends, loginRequest} from "services/api";
import { history } from 'app';
import {LOAD_REPOS} from 'containers/App/constants';
import * as types from './constants';
import {reposLoaded, repoLoadingError} from 'containers/App/actions';
import * as appActions from './actions';

import request from 'utils/request';
import {makeSelectUsername} from 'containers/HomePage/selectors';
import {initialState} from "../Login/reducer";
import {createSelector} from "reselect";



/*------------------------------------------------------------------------*/
/**
 * Login request/response handler
 */
export function* tryLogin() {
    const selectForm = state => state.get('form');
    const makeSelectLoginData = () => createSelector(selectForm, form => form.getIn(['LoginForm', 'values']));
    const loginData = yield select(makeSelectLoginData());
    const {email, password} = loginData.toJS();
    console.log('try');
    try {
        console.log('try2');
        //const data = yield loginRequest({ email, password }).then(res => res.data).catch(e => e.response.data);
        const data = yield loginRequest({ email, password })
            .then(res => res.data).catch(e => (e.response && e.response.data) || e);
        console.log(data);
        if (data.success) {
            yield put(appActions.loginSuccess(data));
            yield call(history.push, '/');
        } else {
            yield put(appActions.serverError(data.error));
        }

    } catch (e) {
        yield put(appActions.serverError(e));
    }
}
export function* watchLogin() {
    yield takeLatest(types.LOGIN, tryLogin);
}
/*------------------------------------------------------------------------*/


/**
 * Watcher
 */
export default function* rootSaga() {
    yield all([
        watchLogin(),
    ])
}
