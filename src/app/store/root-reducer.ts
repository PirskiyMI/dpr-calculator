import { combineReducers } from '@reduxjs/toolkit';

import { attackParamsReducer, attackTypeReducer, specialPropertiesReducer } from 'entities/attack';
import { damageReducer, throwListReducer } from 'entities/throw';

export const rootReducer = combineReducers({
   attackParams: attackParamsReducer,
   attackType: attackTypeReducer,
   damageReducer,
   specialProperties: specialPropertiesReducer,
   throwListReducer,
});
