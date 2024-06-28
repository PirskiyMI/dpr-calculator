import { createSelector } from '@reduxjs/toolkit';

const specialPropertiesSelector = (state: RootState) => state.specialProperties;

export const getSpecialPropertiesSelector = createSelector(
   [specialPropertiesSelector, (_specialPropertiesSelector, id: string) => id],
   (specialProperties, id) => specialProperties[id],
);
