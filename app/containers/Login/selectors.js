
import {createSelector} from 'reselect';
import {initialState} from './reducer';

export const selectLogin = state => state.login || initialState;
export const selectForm = state => state.form || initialState;


export const makeSelectCurrentEnqType = () =>
    createSelector(selectForm, form => form.SupportForm && form.SupportForm.values.enquiry_type);

export const makeSelectEnquiryTypes = () =>
    createSelector(selectLogin, login => login.enquiryTypes);

