
import { fork } from 'redux-saga/effects';

import appSaga from "containers/App/saga";
import enquirySaga from "containers/Enquiry/saga";

export default function* rootSaga() {
    yield [
        fork(appSaga),
        fork(enquirySaga),
    ];
}
