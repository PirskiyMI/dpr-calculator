import { createSelector } from '@reduxjs/toolkit';

export const dicesSelector = (state: RootState) => state.damageReducer.dices;

export const damageSelector = createSelector([dicesSelector], (dices) => {
   const res = dices.reduce((acc, { count, value, damageModifier, damageEfficiency }) => {
      if (damageEfficiency === 'immunity') return acc;

      const averageDamage = count * +value + damageModifier;

      const damage =
         damageEfficiency === 'resistance'
            ? averageDamage * 0.5
            : damageEfficiency === 'vulnerability'
            ? averageDamage * 2
            : averageDamage;

      return (acc += damage);
   }, 0);
   return res;
});
