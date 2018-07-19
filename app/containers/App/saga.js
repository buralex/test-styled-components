
import {call, put, select, all, takeLatest} from 'redux-saga/effects';
import { history } from 'app';

import {
    fetchCategories,
    fetchSuggestedFriends,
    fetchSuggestedCompanies,
    fetchSuggestedProducts,
    loginRequest,
} from "services/api";



import * as types from './constants/types';

import * as actions from './actions';
import * as appActions from "containers/App/actions";

/**
 * Login
 */
export function* login(action) {
    const {email, password} = action.payload;

    try {
        yield put(actions.showLoader());

        const data = yield loginRequest({ email, password }).then(res => res.data);

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
 * Load enquiry types
 */
export function* loadSuggestions() {
    try {
        yield put(appActions.showLoader());

        const [friends, companies, products] = yield Promise.all([
            fetchSuggestedFriends().then(res => res.data.data).catch(e => e && e.data),
            fetchSuggestedCompanies().then(res => res.data.data).catch(e => e && e.data),
            fetchSuggestedProducts().then(res => res.data.data).catch(e => e && e.data),
        ]);

        yield put({
            type: types.LOAD_SUGGESTIONS_SUCCESS,
            payload: {
                friends,
                companies,
                products,
            },
        });

        yield put(appActions.hideLoader());

    } catch (e) {
        yield put(appActions.serverError(e));
    }
}
export function* watchLoadSuggestions() {
    yield takeLatest(types.LOAD_SUGGESTIONS, loadSuggestions);
}


/**
 * Watcher
 */
export default function* saga() {
    yield all([
        watchLogin(),
        watchLoadSuggestions(),
    ])
}
