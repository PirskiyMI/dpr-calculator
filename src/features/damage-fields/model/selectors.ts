import { createSelector } from '@reduxjs/toolkit';

const dicesSelector = (state: RootState) => state.damageReducer;

export const getDicesSelector = createSelector(
   [dicesSelector, (_dicesSelector, id: string) => id],
   (dices, id) => dices[id].dices,
);

export const getDamageSelector = createSelector(
   [dicesSelector, (_dicesSelector, id: string) => id],
   (dices, id) => {
      const res = dices[id].dices.reduce(
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
   },
);

export const getIsDamageFitActive = (state: RootState, id: string) =>
   state.damageReducer[id].isDamageFitActive;
