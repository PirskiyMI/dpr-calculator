import { createSelector } from '@reduxjs/toolkit';

export const hasElvenAccuracySelector = (state: RootState) =>
   state.specialPropertiesReducer.hasElvenAccuracy;
export const hasShieldSelector = (state: RootState) => state.specialPropertiesReducer.hasShield;
export const hasWeaponFeatsSelector = (state: RootState) =>
   state.specialPropertiesReducer.hasWeaponFeats;
export const coverSelector = (state: RootState) => state.specialPropertiesReducer.cover;

export const specialPropertiesSelector = createSelector(
   [hasElvenAccuracySelector, hasShieldSelector, hasWeaponFeatsSelector, coverSelector],
   (hasElvenAccuracy, hasShield, hasWeaponFeats, cover) => ({
      hasElvenAccuracy,
      hasShield,
      hasWeaponFeats,
      cover,
   }),
);
