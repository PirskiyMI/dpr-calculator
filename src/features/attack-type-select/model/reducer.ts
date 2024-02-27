import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type throwType = 'disadvantage' | 'default' | 'advantage';

interface IAttackType {
   type: throwType;
}

const initialState: IAttackType = {
   type: 'default',
};

const attackTypeSlice = createSlice({
   name: 'attack-type',
   initialState,
   reducers: {
      setThrowType: (state, { payload }: PayloadAction<throwType>) => {
         state.type = payload;
      },
   },
});

export const attackTypeReducer = attackTypeSlice.reducer;
export const attackTypeActions = attackTypeSlice.actions;
