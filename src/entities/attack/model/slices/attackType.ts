import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TThrow } from 'entities/attack/lib';

const initialState: Record<string, TThrow> = {
   'throw-1': 'default',
};

const attackTypeSlice = createSlice({
   name: 'attack-type',
   initialState,
   reducers: {
      addThrowType: (state, { payload }: PayloadAction<string>) => {
         state[payload] = 'default';
      },
      setThrowType: (
         state,
         { payload: { id, TThrow } }: PayloadAction<{ id: string; TThrow: TThrow }>,
      ) => {
         state[id] = TThrow;
      },
      removeThrowType: (state, { payload }: PayloadAction<string>) => {
         delete state[payload];
      },
      copyThrowType: (
         state,
         { payload: { id, paramId } }: PayloadAction<{ id: string; paramId: string }>,
      ) => {
         state[id] = state[paramId];
      },
   },
});

export const attackTypeReducer = attackTypeSlice.reducer;
export const attackTypeActions = attackTypeSlice.actions;
