import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DamageEfficiency, DamageType } from '../constants/damage';
import { DiceName, DiceValue } from '../constants/dice';
import { IDice } from '../lib/types/dice';

interface IState {
   isDamageFitActive: boolean;
   dices: IDice[];
}

const initialState: Record<string, IState> = {
   'throw-1': {
      isDamageFitActive: false,
      dices: [
         {
            id: '1',
            count: 0,
            damageModifier: 0,
            name: DiceName.D4,
            value: DiceValue.D4,
            damageType: DamageType.PIERCING,
            damageEfficiency: DamageEfficiency.DEFAULT,
            hasDamageFit: false,
         },
      ],
   },
};

const damageSlice = createSlice({
   name: 'damage',
   initialState,
   reducers: {
      addThrow: (state, { payload }: PayloadAction<string>) => {
         state[payload] = {
            isDamageFitActive: false,
            dices: [
               {
                  id: '1',
                  count: 0,
                  damageModifier: 0,
                  name: DiceName.D4,
                  value: DiceValue.D4,
                  damageType: DamageType.PIERCING,
                  damageEfficiency: DamageEfficiency.DEFAULT,
                  hasDamageFit: false,
               },
            ],
         };
      },
      removeThrow: (state, { payload }: PayloadAction<string>) => {
         delete state[payload];
      },
      copyThrow: (
         state,
         { payload: { id, paramId } }: PayloadAction<{ id: string; paramId: string }>,
      ) => {
         state[id] = { ...state[paramId] };
      },
      setDices: (
         state,
         {
            payload: { id, dice },
         }: PayloadAction<{ id: string; dice: { id: string; count: number } }>,
      ) => {
         state[id].dices.forEach((el) => (el.id === dice.id ? (el.count = dice.count) : null));
      },
      changeDice: (
         state,
         { payload: { id, dice } }: PayloadAction<{ id: string; dice: IDice }>,
      ) => {
         state[id].dices = state[id].dices.map((el) => (el.id === dice.id ? dice : el));
      },
      setDamageFit: (
         state,
         { payload: { id, diceId } }: PayloadAction<{ id: string; diceId: string }>,
      ) => {
         state[id].dices.forEach((el) => {
            if (el.id === diceId) {
               if (el.hasDamageFit) {
                  el.hasDamageFit = false;
                  state[id].isDamageFitActive = false;
               } else {
                  el.hasDamageFit = true;
                  state[id].isDamageFitActive = true;
               }
            } else {
               el.hasDamageFit = false;
            }
         });
      },
      addDice: (state, { payload: id }: PayloadAction<string>) => {
         if (state[id].dices.length === 5) return;
         const diceId = String(Date.now());
         state[id].dices.push({
            id: diceId,
            count: 0,
            damageModifier: 0,
            name: DiceName.D6,
            value: DiceValue.D6,
            damageType: DamageType.PIERCING,
            damageEfficiency: DamageEfficiency.DEFAULT,
            hasDamageFit: false,
         });
      },
      removeDice: (
         state,
         { payload: { id, diceId } }: PayloadAction<{ id: string; diceId: string }>,
      ) => {
         state[id].dices = state[id].dices.filter((el) => {
            if (el.id === diceId) {
               if (el.hasDamageFit) {
                  state[id].isDamageFitActive = false;
                  return false;
               }
               return false;
            }
            return true;
         });
      },
   },
});

export const damageReducer = damageSlice.reducer;
export const damageActions = damageSlice.actions;
