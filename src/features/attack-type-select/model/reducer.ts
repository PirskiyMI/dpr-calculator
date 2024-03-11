import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type throwType = 'disadvantage' | 'default' | 'advantage';

const initialState: Record<string, throwType> = {
   'throw-1': 'default',
};

const attackTypeSlice = createSlice({
   name: 'attack-type',
   initialState,
   reducers: {
      setThrowType: (
         state,
         { payload: { id, throwType } }: PayloadAction<{ id: string; throwType: throwType }>,
      ) => {
         state[id] = throwType;
      },
   },
});

export const attackTypeReducer = attackTypeSlice.reducer;
export const attackTypeActions = attackTypeSlice.actions;
