
import {createSelector} from 'reselect';
import {initialState} from './reducer';

export const selectEnquiry = state => state.enquiry || initialState;
export const selectForm = state => state.form || initialState;


export const makeSelectCurrentEnqType = () =>
    createSelector(selectForm, form => form.EnquiryForm && form.EnquiryForm.values.enquiry_type === 'Other');

export const makeSelectEnquiryTypes = () =>
    createSelector(selectEnquiry, enquiry => enquiry.enquiryTypes);

