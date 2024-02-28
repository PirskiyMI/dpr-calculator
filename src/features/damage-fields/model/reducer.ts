import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TDiceName = 'd4' | 'd6' | 'd8' | 'd10' | 'd12';
export type TDiceValue = '2.5' | '3.5' | '4.5' | '5.5' | '6.5';

enum DiceName {
   D4 = 'd4',
   D6 = 'd6',
   D8 = 'd8',
   D10 = 'd10',
   D12 = 'd12',
}
enum DiceValue {
   D4 = '2.5',
   D6 = '3.5',
   D8 = '4.5',
   D10 = '5.5',
   D12 = '6.5',
}

interface IDace {
   name: TDiceName;
   value: TDiceValue;
   count: number;
}

interface IDamage {
   dices: IDace[];
}

const initialState: IDamage = {
   dices: [
      {
         name: DiceName.D4,
         value: DiceValue.D4,
         count: 1,
      },
      {
         name: DiceName.D6,
         value: DiceValue.D6,
         count: 1,
      },
      {
         name: DiceName.D8,
         value: DiceValue.D8,
         count: 0,
      },
      {
         name: DiceName.D10,
         value: DiceValue.D10,
         count: 0,
      },
      {
         name: DiceName.D12,
         value: DiceValue.D12,
         count: 0,
      },
   ],
};

const damageSlice = createSlice({
   name: 'damage',
   initialState,
   reducers: {
      setDices: (state, { payload }: PayloadAction<{ name: TDiceName; count: number }>) => {
         state.dices.forEach((el) =>
            el.name === payload.name ? (el.count = payload.count) : null,
         );
      },
   },
});

export const damageReducer = damageSlice.reducer;
export const damageActions = damageSlice.actions;
