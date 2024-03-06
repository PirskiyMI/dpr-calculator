import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cover } from '../types';

interface ISpecialProperties {
   hasElvenAccuracy: boolean;
   hasShield: boolean;
   hasWeaponFeats: boolean;
   cover: Cover;
}
const initialState: ISpecialProperties = {
   hasElvenAccuracy: false,
   hasShield: false,
   hasWeaponFeats: false,
   cover: Cover.ABSENT,
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
      setCover: (state, { payload }: PayloadAction<keyof typeof Cover>) => {
         state.cover = Cover[payload];
      },
   },
});

export const specialPropertiesReducer = specialPropertiesSlice.reducer;
export const specialPropertiesActions = specialPropertiesSlice.actions;
