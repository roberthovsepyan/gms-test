import {combineReducers} from 'redux';
import table from './table';
import counter from './counter';

export const allReducers=combineReducers({
    table,
    counter
});