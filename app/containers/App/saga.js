
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

        const data = yield fetchCategories().then(res => res.data);
        //
        // const [friends, companies] = yield Promise.all([
        //     fetchSuggestedFriends().then(res => res.data).catch(e => e),
        //     fetchSuggestedCompanies().then(res => res.data).catch(e => e.response.data),
        // ]).then((first, second) => console.log('Then', first, second));

        const [friends, companies] = yield Promise.all([
            fetchSuggestedFriends().then(res => res.data).catch(e => e),
            fetchSuggestedCompanies().then(res => res.data).catch(e => e.response.data),
        ])
            //.then((first, second) => console.log('Then', first, second));


        // yield Promise.all([
        //     fetchSuggestedFriends().catch(e => e),
        //     fetchSuggestedCompanies().catch(e => e.response.data),
        // ])
        //     .then((first, second) => console.log('Then', first, second))
        //     .catch(err => console.log('Catch', err));

        yield put({
            type: types.LOAD_SUGGESTIONS_SUCCESS,
            payload: {
                friends,
                companies,
            },
        });

        // Promise.all([a.catch(e => e), b.catch(e => e)])
        //     .then((first, second) => console.log('Then', first, second)) // Then ["Resolved!", "Rejected!"]
        //     .catch(err => console.log('Catch', err));

        // console.log(data);
        // console.log(friends);
        // console.log(companies);
/*-------------------------------------------------------------------*/
        let a = new Promise((res, rej) => res('Resolved!')),
            b = new Promise((res, rej) => rej('Rejected!')),
            c = a.catch(e => { console.log('"a" failed.'); return e; }),
            d = b.catch(e => { console.log('"b" failed.'); return e; });

        Promise.all([c, d])
            .then((first, second) => console.log('Then', first, second)) // Then ["Resolved!", "Rejected!"]
            .catch(err => console.log('Catch', err));

        Promise.all([a.catch(e => e), b.catch(e => e)])
            .then((first, second) => console.log('Then', first, second)) // Then ["Resolved!", "Rejected!"]
            .catch(err => console.log('Catch', err));
/*---------------------------------------------------------------------------*/


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
