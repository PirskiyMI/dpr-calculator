import { createSelector } from '@reduxjs/toolkit';

export const attackTypeSelector = (state: RootState) => state.attackTypeReducer;

export const getThrowTypeSelector = createSelector(
   [attackTypeSelector, (_attackTypeSelector, id: string) => id],
   (throwTypes, id) => throwTypes[id],
);
