import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TDiceName = 'd4' | 'd6' | 'd8' | 'd10' | 'd12';
export type TDiceValue = '2.5' | '3.5' | '4.5' | '5.5' | '6.5';

export enum DiceName {
   d4 = 'd4',
   d6 = 'd6',
   d8 = 'd8',
   d10 = 'd10',
   d12 = 'd12',
}
enum DiceValue {
   d4 = '2.5',
   d6 = '3.5',
   d8 = '4.5',
   d10 = '5.5',
   d12 = '6.5',
}

export interface IDice {
   id: string;
   name: TDiceName;
   value: TDiceValue;
   count: number;
}
interface IDamage {
   dices: IDice[];
}
const initialState: IDamage = {
   dices: [
      {
         id: '1',
         name: DiceName.d4,
         value: DiceValue.d4,
         count: 0,
      },
   ],
};

const damageSlice = createSlice({
   name: 'damage',
   initialState,
   reducers: {
      setDices: (state, { payload }: PayloadAction<{ id: string; count: number }>) => {
         state.dices.forEach((el) => (el.id === payload.id ? (el.count = payload.count) : null));
      },
      addDice: (state) => {
         const id = String(Date.now());
         state.dices.push({ id, name: DiceName.d6, value: DiceValue.d6, count: 0 });
      },
      setDiceType: (state, { payload }: PayloadAction<{ id: string; name: TDiceName }>) => {
         state.dices.forEach((el) => {
            if (el.id === payload.id) {
               el.name = payload.name;
               el.value = DiceValue[`${payload.name}`];
            }
         });
      },
   },
});

export const damageReducer = damageSlice.reducer;
export const damageActions = damageSlice.actions;
