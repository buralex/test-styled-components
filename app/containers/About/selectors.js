import {createSelector} from 'reselect';
import {initialState} from './reducer';

export const selectAbout = state => state.about || initialState;
export const selectForm = state => state.form || initialState;


export const makeSelectCurrentEnqType = () =>
    createSelector(selectForm, form => form.AboutForm && form.AboutForm.values.enquiry_type);

export const makeSelectEnquiryTypes = () =>
    createSelector(selectAbout, about => about.enquiryTypes);

