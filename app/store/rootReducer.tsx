import {combineReducers} from 'redux';
import convertSlice from './convertSlice';

const rootReducer = combineReducers({
  convert: convertSlice.reducer,
});

export default rootReducer;
