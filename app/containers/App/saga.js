
import {call, put, select, all, takeLatest} from 'redux-saga/effects';
import { history } from 'app';
import omit from 'lodash/omit';

import {
    fetchSuggestedFriends,
    fetchSuggestedCompanies,
    fetchSuggestedProducts,
    loginRequest,
    fetchEnquiryTypes,
    postToSupport,
} from "services/api";



import * as types from './constants/types';

import * as actions from './actions';
import * as appActions from "containers/App/actions";

import {FIELDS as db} from "../../components/SupportForm/constants/fields";

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
            fetchSuggestedFriends({per_page:"3"}).then(res => res.data.data).catch(e => e && e.data),
            fetchSuggestedCompanies({per_page:"3"}).then(res => res.data.data).catch(e => e && e.data),
            fetchSuggestedProducts({per_page:"2"}).then(res => res.data.data).catch(e => e && e.data),
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
 * Load enquiry types
 */
export function* loadEnquiryTypes() {
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
}
export function* watchLoadEnquiryTypes() {
    yield takeLatest(types.LOAD_ENQUIRY_TYPES, loadEnquiryTypes);
}


/**
 * Post enquiry
 */
export function* postEnquiry(action) {
    let values = action.payload;

    if (values[db.other_enquiry_type]) {
        // replace enquiry with other and delete other prop
        values = omit(
            {...values, [db.enquiry_type]: values[db.other_enquiry_type]},
            [db.other_enquiry_type]
        );
    }

    try {
        yield put(appActions.showLoader());

        const data = yield postToSupport(values).then(res => res.data);

        yield put(appActions.serverSuccess(data));

    } catch (e) {
        yield put(appActions.serverError(e));
    }
}
export function* watchPostEnquiry() {
    yield takeLatest(types.POST_ENQUIRY, postEnquiry);
}


/**
 * Watcher
 */
export default function* saga() {
    yield all([
        watchLogin(),
        watchLoadSuggestions(),

        watchLoadEnquiryTypes(),
        watchPostEnquiry(),
    ])
}
