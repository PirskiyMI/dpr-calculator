import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IAttack {
   attackBonus: number;
   targetProtection: number;
}

const initialState: Record<string, IAttack> = {
   'throw-1': { attackBonus: 0, targetProtection: 8 },
};

const attackParamsSlice = createSlice({
   name: 'attack-params',
   initialState,
   reducers: {
      addAttackParams: (state, { payload }: PayloadAction<string>) => {
         state[payload] = { attackBonus: 0, targetProtection: 8 };
      },
      setAttackParams: (
         state,
         {
            payload: { id, params },
         }: PayloadAction<{
            id: string;
            params: { attackBonus?: number; targetProtection?: number };
         }>,
      ) => {
         state[id] = { ...state[id], ...params };
      },
      removeAttackParams: (state, { payload }: PayloadAction<string>) => {
         delete state[payload];
      },
      copyAttackParams: (
         state,
         { payload: { id, paramId } }: PayloadAction<{ id: string; paramId: string }>,
      ) => {
         state[id] = { ...state[paramId] };
      },
   },
});

export const attackParamsReducer = attackParamsSlice.reducer;
export const attackParamsActions = attackParamsSlice.actions;
