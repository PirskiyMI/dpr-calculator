import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IAttack {
   attackBonus: number;
   targetProtection: number;
}

const initialState: Record<string, IAttack> = {
   'throw-1': { attackBonus: 0, targetProtection: 10 },
};

const attackParamsSlice = createSlice({
   name: 'attackParams',
   initialState,
   reducers: {
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
   },
});

export const attackParamsReducer = attackParamsSlice.reducer;
export const attackParamsActions = attackParamsSlice.actions;
