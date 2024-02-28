import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const specialPropertiesSlice = createSlice({
   name: 'special-properties',
   initialState,
   reducers: {},
});

export const specialPropertiesReducer = specialPropertiesSlice.reducer;
export const specialPropertiesActions = specialPropertiesSlice.actions;
