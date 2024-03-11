import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cover } from '../types';

interface ISpecialProperties {
   hasElvenAccuracy: boolean;
   hasShield: boolean;
   hasWeaponFeats: boolean;
   cover: Cover;
}
const initialState: Record<string, ISpecialProperties> = {
   'throw-1': {
      hasElvenAccuracy: false,
      hasShield: false,
      hasWeaponFeats: false,
      cover: Cover.ABSENT,
   },
};
const specialPropertiesSlice = createSlice({
   name: 'special-properties',
   initialState,
   reducers: {
      setSpecialProperties: (
         state,
         {
            payload: { id, params },
         }: PayloadAction<{
            id: string;
            params: { hasElvenAccuracy?: boolean; hasShield?: boolean; hasWeaponFeats?: boolean };
         }>,
      ) => {
         state[id] = { ...state[id], ...params };
      },
      setCover: (
         state,
         { payload: { id, cover } }: PayloadAction<{ id: string; cover: keyof typeof Cover }>,
      ) => {
         state[id].cover = Cover[cover];
      },
   },
});

export const specialPropertiesReducer = specialPropertiesSlice.reducer;
export const specialPropertiesActions = specialPropertiesSlice.actions;
