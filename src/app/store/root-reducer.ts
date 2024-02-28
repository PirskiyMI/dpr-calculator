import { combineReducers } from '@reduxjs/toolkit';

import { attackReducer } from 'src/features/attack-fields';
import { attackTypeReducer } from 'src/features/attack-type-select';
import { damageReducer } from 'src/features/damage-fields';
import { specialPropertiesReducer } from 'src/features/special-properties';

export const rootReducer = combineReducers({
   attackReducer,
   attackTypeReducer,
   damageReducer,
   specialPropertiesReducer,
});
