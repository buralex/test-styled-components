
import {createSelector} from 'reselect';
import {initialState} from './reducer';

export const selectLand = state => state.land || initialState;
export const selectForm = state => state.form || initialState;


export const makeSelectCurrentEnqType = () =>
    createSelector(selectForm, form => form.AboutForm && form.AboutForm.values.enquiry_type);

export const makeSelectEnquiryTypes = () =>
    createSelector(selectLand, about => about.enquiryTypes);

