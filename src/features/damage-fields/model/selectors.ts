import { createSelector } from '@reduxjs/toolkit';

export const dicesSelector = (state: RootState) => state.damageReducer.dices;

export const damageSelector = createSelector([dicesSelector], (dices) => {
   const res = dices.reduce((acc, { count, value, damageEfficiency }) => {
      if (damageEfficiency === 'immunity') return acc;

      const damage =
         damageEfficiency === 'resistance'
            ? count * +value * 0.5
            : damageEfficiency === 'vulnerability'
            ? count * +value * 2
            : count * +value;

      return (acc += damage);
   }, 0);
   return res;
});
