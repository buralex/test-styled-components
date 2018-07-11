/**
 * Gets the repositories of the user from Github
 */

import {call, put, select, takeLatest} from 'redux-saga/effects';
import {LOAD_REPOS} from 'containers/App/constants';
import * as types from './constants';
import {reposLoaded, repoLoadingError} from 'containers/App/actions';
import * as appActions from './actions';

import request from 'utils/request';
import {makeSelectUsername} from 'containers/HomePage/selectors';
import {fetchFriends} from "services/api";

// /**
//  * Github repos request/response handler
//  */
// export function* getRepos() {
//     // Select username from store
//     const username = yield select(makeSelectUsername());
//     const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
//
//     try {
//         // Call our request helper (see 'utils/request')
//         const repos = yield call(request, requestURL);
//         yield put(reposLoaded(repos, username));
//     } catch (err) {
//         yield put(repoLoadingError(err));
//     }
// }
//
// /**
//  * Root saga manages watcher lifecycle
//  */
// export default function* githubData() {
//     // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//     // By using `takeLatest` only the result of the latest API call is applied.
//     // It returns task descriptor (just like fork) so we can continue execution
//     // It will be cancelled automatically on component unmount
//     yield takeLatest(LOAD_REPOS, getRepos);
// }


// /**
//  * Github repos request/response handler
//  */
// export function* getRepos() {
//     // Select username from store
//     const username = yield select(makeSelectUsername());
//     const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
//
//     try {
//         // Call our request helper (see 'utils/request')
//         //const repos = yield call(request, requestURL);
//
//          const repos = yield fetchFriends({
//              per_page: 10,
//          }).then(res => res.data).catch(e => e.response.data);
//         console.log(data);
//         yield put(reposLoaded(repos, username));
//     } catch (err) {
//         yield put(repoLoadingError(err));
//     }
// }
//
// /**
//  * Root saga manages watcher lifecycle
//  */
// export default function* githubData() {
//     // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//     // By using `takeLatest` only the result of the latest API call is applied.
//     // It returns task descriptor (just like fork) so we can continue execution
//     // It will be cancelled automatically on component unmount
//     //yield takeLatest(LOAD_REPOS, getRepos);
//     yield takeLatest(LOAD_REPOS, getRepos);
// }

/**
 * Login request/response handler
 */
export function* tryLogin() {
    // Select username from store
    //const username = yield select(makeSelectUsername());
    const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
    console.log('lllllllloooooooo');
    try {
        // // Call our request helper (see 'utils/request')
        //const repos = yield call(request, requestURL);

        console.log('try block');

        // const data = await fetchFriends({
        //     per_page: 10,
        // }).then(res => res.data).catch(e => e.response.data);

        const data = yield fetchFriends({
            per_page: 10,
        }).then(res => res.data).catch(e => e.response.data);

        yield put(appActions.loginSuccess(data));
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
