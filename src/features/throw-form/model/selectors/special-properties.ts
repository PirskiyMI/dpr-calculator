import { createSelector } from '@reduxjs/toolkit';

const specialPropertiesSelector = (state: RootState) => state.specialPropertiesReducer;

export const getSpecialPropertiesSelector = createSelector(
   [specialPropertiesSelector, (_specialPropertiesSelector, id: string) => id],
   (specialProperties, id) => specialProperties[id],
);
