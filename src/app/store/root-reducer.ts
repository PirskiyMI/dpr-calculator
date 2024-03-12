import { combineReducers } from '@reduxjs/toolkit';

import {
   attackParamsReducer,
   attackTypeReducer,
   damageReducer,
   specialPropertiesReducer,
   throwListReducer,
} from 'src/features/throw-form';

export const rootReducer = combineReducers({
   attackParamsReducer,
   attackTypeReducer,
   damageReducer,
   specialPropertiesReducer,
   throwListReducer,
});
