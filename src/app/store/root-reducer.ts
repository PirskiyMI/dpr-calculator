import { combineReducers } from '@reduxjs/toolkit';

import { attackParamsReducer } from 'src/features/attack-fields';
import { attackTypeReducer } from 'src/features/attack-type-select';
import { damageReducer } from 'src/features/damage-fields';
import { specialPropertiesReducer } from 'src/features/special-properties';
import { throwListReducer } from 'src/widgets/add-throw/model/reducers';

export const rootReducer = combineReducers({
   attackParamsReducer,
   attackTypeReducer,
   damageReducer,
   specialPropertiesReducer,
   throwListReducer,
});
