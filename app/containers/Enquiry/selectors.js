/**
 * Homepage selectors
 */

import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectEnquiry = state => state.enquiry || initialState;

const makeSelectUsername = () =>
    createSelector(selectEnquiry, enquiryState => enquiryState.username);

export {selectEnquiry, makeSelectUsername};
