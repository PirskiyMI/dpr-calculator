import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDice, TDiceType } from '../../lib/types/dice-types';
import { DamageEfficiency, DamageType } from '../../constants/damage-consts';
import { DiceName, DiceValue } from '../../constants/dice-consts';

interface IDamage {
   isDamageFitActive: boolean;
   dices: IDice[];
}

const initialState: Record<string, IDamage> = {
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
      setDices: (
         state,
         {
            payload: { id, dice },
         }: PayloadAction<{ id: string; dice: { id: string; count: number } }>,
      ) => {
         state[id].dices.forEach((el) => (el.id === dice.id ? (el.count = dice.count) : null));
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
      setDamageModifier: (
         state,
         {
            payload: { id, dice },
         }: PayloadAction<{ id: string; dice: { id: string; damageModifier: number } }>,
      ) => {
         state[id].dices.forEach((el) =>
            el.id === dice.id ? (el.damageModifier = dice.damageModifier) : null,
         );
      },
      setDiceType: (
         state,
         {
            payload: { id, dice },
         }: PayloadAction<{ id: string; dice: { id: string; name: TDiceType } }>,
      ) => {
         state[id].dices.forEach((el) => {
            if (el.id === dice.id) {
               el.name = DiceName[`${dice.name}`];
               el.value = DiceValue[`${dice.name}`];
            }
         });
      },
      setDamageType: (
         state,
         {
            payload: { id, dice },
         }: PayloadAction<{
            id: string;
            dice: { id: string; damageType: keyof typeof DamageType };
         }>,
      ) => {
         state[id].dices.forEach((el) =>
            el.id === dice.id ? (el.damageType = DamageType[`${dice.damageType}`]) : null,
         );
      },
      setDamageEfficiency: (
         state,
         {
            payload: { id, dice },
         }: PayloadAction<{
            id: string;
            dice: { id: string; damageEfficiency: keyof typeof DamageEfficiency };
         }>,
      ) => {
         state[id].dices.forEach((el) =>
            el.id === dice.id
               ? (el.damageEfficiency = DamageEfficiency[`${dice.damageEfficiency}`])
               : null,
         );
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
   },
});

export const damageReducer = damageSlice.reducer;
export const damageActions = damageSlice.actions;
