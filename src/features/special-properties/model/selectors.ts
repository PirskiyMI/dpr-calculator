import { createSelector } from '@reduxjs/toolkit';

const specialPropertiesSelector = (state: RootState) => state.specialPropertiesReducer;

export const getHasElvenAccuracySelector = createSelector(
   [specialPropertiesSelector, (_specialPropertiesSelector, id: string) => id],
   (specialProperties, id) => specialProperties[id].hasElvenAccuracy,
);
export const getHasShieldSelector = createSelector(
   [specialPropertiesSelector, (_specialPropertiesSelector, id: string) => id],
   (specialProperties, id) => specialProperties[id].hasShield,
);
export const getHasWeaponFeatsSelector = createSelector(
   [specialPropertiesSelector, (_specialPropertiesSelector, id: string) => id],
   (specialProperties, id) => specialProperties[id].hasWeaponFeats,
);
export const getHasCoverSelector = createSelector(
   [specialPropertiesSelector, (_specialPropertiesSelector, id: string) => id],
   (specialProperties, id) => specialProperties[id].cover,
);

export const getSpecialPropertiesSelector = createSelector(
   [specialPropertiesSelector, (_specialPropertiesSelector, id: string) => id],
   (specialProperties, id) => ({
      ...specialProperties[id],
   }),
);
