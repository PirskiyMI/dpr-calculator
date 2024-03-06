import { createSelector } from '@reduxjs/toolkit';

export const dicesSelector = (state: RootState) => state.damageReducer.dices;

export const damageSelector = createSelector([dicesSelector], (dices) => {
   const res = dices.reduce(
      (acc, { count, value, damageModifier, hasDamageFit, damageEfficiency }) => {
         if (damageEfficiency === 'immunity') return acc;
         const fitBonusDamage = hasDamageFit ? 10 : 0;

         const averageDamage = count * +value + damageModifier + fitBonusDamage;

         const damage =
            damageEfficiency === 'resistance'
               ? averageDamage * 0.5
               : damageEfficiency === 'vulnerability'
               ? averageDamage * 2
               : averageDamage;

         return (acc += damage);
      },
      0,
   );
   return res;
});

export const isDamageFitActive = (state: RootState) => state.damageReducer.isDamageFitActive;
