import { createSelector } from '@reduxjs/toolkit';

const attackBonusSelector = (state: RootState) => state.attackReducer.attackBonus;
const targetProtectionSelector = (state: RootState) => state.attackReducer.targetProtection;

export const attackSelector = createSelector(
   [attackBonusSelector, targetProtectionSelector],
   (attack, protection) => ({
      attack,
      protection,
   }),
);
