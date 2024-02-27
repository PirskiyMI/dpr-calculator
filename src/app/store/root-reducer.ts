import { combineReducers } from '@reduxjs/toolkit';
import { attackReducer } from 'src/features/attack-fields';
import { attackTypeReducer } from '../../features/attack-type-select/model/reducer';

export const rootReducer = combineReducers({
   attackReducer,
   attackTypeReducer,
});
