import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDice, TDiceType } from '../types';
import { DamageEfficiency, DamageType, DiceName, DiceValue } from '../constants';

interface IDamage {
   dices: IDice[];
}

const initialState: IDamage = {
   dices: [
      {
         id: '1',
         count: 0,
         damageModifier: 0,
         name: DiceName.D4,
         value: DiceValue.D4,
         damageType: DamageType.PIERCING,
         damageEfficiency: DamageEfficiency.DEFAULT,
      },
   ],
};

const damageSlice = createSlice({
   name: 'damage',
   initialState,
   reducers: {
      setDices: (
         state,
         { payload: { id, count } }: PayloadAction<{ id: string; count: number }>,
      ) => {
         state.dices.forEach((el) => (el.id === id ? (el.count = count) : null));
      },
      addDice: (state) => {
         const id = String(Date.now());
         state.dices.push({
            id,
            count: 0,
            damageModifier: 0,
            name: DiceName.D6,
            value: DiceValue.D6,
            damageType: DamageType.PIERCING,
            damageEfficiency: DamageEfficiency.DEFAULT,
         });
      },
      removeDice: (state, { payload }: PayloadAction<string>) => {
         state.dices = state.dices.filter((el) => el.id !== payload);
      },
      setDamageModifier: (
         state,
         { payload: { id, damageModifier } }: PayloadAction<{ id: string; damageModifier: number }>,
      ) => {
         state.dices.forEach((el) => (el.id === id ? (el.damageModifier = damageModifier) : null));
      },
      setDiceType: (
         state,
         { payload: { id, name } }: PayloadAction<{ id: string; name: TDiceType }>,
      ) => {
         state.dices.forEach((el) => {
            if (el.id === id) {
               el.name = DiceName[`${name}`];
               el.value = DiceValue[`${name}`];
            }
         });
      },
      setDamageType: (
         state,
         {
            payload: { id, damageType },
         }: PayloadAction<{ id: string; damageType: keyof typeof DamageType }>,
      ) => {
         state.dices.forEach((el) =>
            el.id === id ? (el.damageType = DamageType[`${damageType}`]) : null,
         );
      },
      setDamageEfficiency: (
         state,
         {
            payload: { id, damageEfficiency },
         }: PayloadAction<{ id: string; damageEfficiency: keyof typeof DamageEfficiency }>,
      ) => {
         state.dices.forEach((el) =>
            el.id === id ? (el.damageEfficiency = DamageEfficiency[`${damageEfficiency}`]) : null,
         );
      },
   },
});

export const damageReducer = damageSlice.reducer;
export const damageActions = damageSlice.actions;
