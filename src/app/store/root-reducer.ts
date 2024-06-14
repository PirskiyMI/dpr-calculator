import { combineReducers } from '@reduxjs/toolkit';

import { attackParamsReducer, attackTypeReducer, specialPropertiesReducer } from 'entities/attack';
import { damageReducer } from 'entities/damage/model/damage-fields-slice';
import { throwListReducer } from 'entities/throw';

export const rootReducer = combineReducers({
   attackParams: attackParamsReducer,
   attackType: attackTypeReducer,
   damage: damageReducer,
   specialProperties: specialPropertiesReducer,
   throwListReducer,
});
