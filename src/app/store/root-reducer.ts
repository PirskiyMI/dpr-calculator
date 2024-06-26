import { combineReducers } from '@reduxjs/toolkit';

import {
   attackParamsReducer,
   attackTypeReducer,
   damageReducer,
   specialPropertiesReducer,
   throwListReducer,
} from 'entities/throw';

export const rootReducer = combineReducers({
   attackParamsReducer,
   attackTypeReducer,
   damageReducer,
   specialPropertiesReducer,
   throwListReducer,
});
