import { createSelector } from '@reduxjs/toolkit';

const throwTypeSelector = (state: RootState) => state.attackTypeReducer;

export const getThrowTypeSelector = createSelector(
   [throwTypeSelector, (_throwTypeSelector, id: string) => id],
   (throwTypeList, id) => throwTypeList[id],
);
