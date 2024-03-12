import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: string[] = ['throw-1'];

const throwListSlice = createSlice({
   name: 'throws',
   initialState,
   reducers: {
      addThrow: (state, { payload }: PayloadAction<string>) => {
         state.push(payload);
      },
      removeThrow: (state, { payload }: PayloadAction<string>) => {
         state.filter((el) => el !== payload);
      },
   },
});

export const throwListReducer = throwListSlice.reducer;
export const throwListActions = throwListSlice.actions;
