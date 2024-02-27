import { combineReducers } from '@reduxjs/toolkit';
import { attackReducer } from 'src/features/attack-fields';

export const rootReducer = combineReducers({
   attackReducer,
});
