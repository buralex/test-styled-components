import { combineReducers } from 'redux';

import list from './list';
import current from './current';


export default combineReducers({
    list,
    current,
});
