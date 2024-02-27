import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type throwType = 'default' | 'advantage' | 'disadvantage';
type diceType = '2.5' | '3.5' | '4.5' | '5.5' | '6.5';

interface IDices {
   '2.5': number;
   '3.5': number;
   '4.5': number;
   '5.5': number;
   '6.5': number;
}

interface IAttackParameters {
   attackBonus: number;
   targetProtection: number;
}

interface IAttackTotals {
   averageDamage: number;
   hitProbability: number;
}

interface IDprForm {
   throwType: throwType;
   attackParameters: IAttackParameters;
   dices: IDices;
   totals: IAttackTotals;
}

const initialState: IDprForm = {
   throwType: 'default',
   attackParameters: {
      attackBonus: 0,
      targetProtection: 10,
   },
   dices: {
      '2.5': 0,
      '3.5': 1,
      '4.5': 11,
      '5.5': 0,
      '6.5': 0,
   },
   totals: { averageDamage: 0, hitProbability: 0 },
};

const dprFormSlice = createSlice({
   name: 'dpr',
   initialState,
   reducers: {
      setThrowType: (state, { payload }: PayloadAction<throwType>) => {
         state.throwType = payload;
      },
      setDices: (state, { payload }: PayloadAction<{ dice: diceType; value: number }>) => {
         const { dice, value } = payload;
         state.dices[dice] = value;
      },
      setAttackBonus: (state, { payload }: PayloadAction<number>) => {
         state.attackParameters.attackBonus = payload;
      },
      setTargetProtection: (state, { payload }: PayloadAction<number>) => {
         state.attackParameters.targetProtection = payload;
      },
      getAverageDamage: (state) => {
         const object = state.dices;
         let result = 0;

         for (const key in object) {
            result += +key * object[key as diceType];
         }

         state.totals.averageDamage = result;
      },
      getHitProbability: () => {},
   },
});

export const dprFormReducer = dprFormSlice.reducer;
export const dprFormActions = dprFormSlice.actions;
