import { createSelector } from '@reduxjs/toolkit';

export const dicesSelector = (state: RootState) => state.damageReducer.dices;

export const damageSelector = createSelector([dicesSelector], (dices) => {
   const res = dices.reduce((acc, { count, value }) => {
      return (acc += count * +value);
   }, 0);
   return res;
});
