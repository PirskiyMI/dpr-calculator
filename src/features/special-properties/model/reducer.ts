import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ISpecialProperties {
   hasElvenAccuracy: boolean;
   hasShield: boolean;
   hasWeaponFeats: boolean;
}
const initialState: ISpecialProperties = {
   hasElvenAccuracy: false,
   hasShield: false,
   hasWeaponFeats: false,
};
const specialPropertiesSlice = createSlice({
   name: 'special-properties',
   initialState,
   reducers: {
      setHasElvenAccuracy: (state, { payload }: PayloadAction<boolean>) => {
         state.hasElvenAccuracy = payload;
      },
      setHasShield: (state, { payload }: PayloadAction<boolean>) => {
         state.hasShield = payload;
      },
      setHasWeaponFeats: (state, { payload }: PayloadAction<boolean>) => {
         state.hasWeaponFeats = payload;
      },
   },
});

export const specialPropertiesReducer = specialPropertiesSlice.reducer;
export const specialPropertiesActions = specialPropertiesSlice.actions;
