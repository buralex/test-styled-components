import {createSelector} from 'reselect';
import {initialState} from './reducer';

export const selectServices = state => state.services || initialState;

export const makeSelectCategories = () => createSelector(selectServices, services => services.categories);
