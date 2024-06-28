import { createSelector } from '@reduxjs/toolkit';

const attackParamsSelector = (state: RootState) => state.attackParams;

export const getAttackParamsSelector = createSelector(
   [attackParamsSelector, (_attackParamsSelector, id: string) => id],
   (paramList, id) => {
      return paramList[id];
   },
);
