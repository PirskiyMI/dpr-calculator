import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IAttack {
   attackBonus: number;
   targetProtection: number;
}

const initialState: IAttack = {
   attackBonus: 0,
   targetProtection: 10,
};

const attackSlice = createSlice({
   name: 'attack',
   initialState,
   reducers: {
      setAttackBonus: (state, { payload }: PayloadAction<number>) => {
         state.attackBonus = payload;
      },
      setTargetProtection: (state, { payload }: PayloadAction<number>) => {
         state.targetProtection = payload;
      },
   },
});

export const attackReducer = attackSlice.reducer;
export const attackActions = attackSlice.actions;
