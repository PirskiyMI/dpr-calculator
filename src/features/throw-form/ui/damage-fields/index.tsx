import { ChangeEvent, memo, useCallback, useMemo } from 'react';

import { IOption, useAppDispatch, useAppSelector } from 'shared/lib';
import {
   getDicesSelector,
   damageActions,
   DamageEfficiency,
   DamageEfficiencyOnRu,
   DamageType,
   DamageTypeOnRu,
   DiceName,
} from 'entities/throw';

import { TDiceType } from '../../lib/types/dice-types';
import { DamageFieldsUI } from './ui';

interface IProps {
   id: string;
}

export const DamageFields = memo(({ id }: IProps) => {
   const dispatch = useAppDispatch();
   const fieldList = useAppSelector((state) => getDicesSelector(state, id));
   const {
      setDices,
      setDiceType,
      addDice,
      removeDice,
      setDamageModifier,
      setDamageType,
      setDamageEfficiency,
      setDamageFit,
   } = damageActions;

   const typeOptions = useMemo(() => {
      const list: IOption[] = [];
      for (const key in DiceName) {
         const title = DiceName[key as keyof typeof DiceName];
         list.push({ title, value: key });
      }
      return list;
   }, []);
   const damageTypeOptions = useMemo(() => {
      const list: IOption[] = [];
      for (const key in DamageType) {
         const title = DamageTypeOnRu[key as keyof typeof DamageTypeOnRu];
         list.push({ title, value: key });
      }
      return list;
   }, []);
   const damageEfficiencyOptions = useMemo(() => {
      const list: IOption[] = [];
      for (const key in DamageEfficiency) {
         const title = DamageEfficiencyOnRu[key as keyof typeof DamageEfficiencyOnRu];
         list.push({ title, value: key });
      }
      return list;
   }, []);

   const onFieldChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const count = +e.target.value;
         dispatch(setDices({ id, dice: { id: e.target.name, count } }));
      },
      [dispatch, id, setDices],
   );
   const onDamageModifierChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const diceId = e.target.name;
         const damageModifier = +e.target.value;
         dispatch(setDamageModifier({ id, dice: { id: diceId, damageModifier } }));
      },
      [dispatch, id, setDamageModifier],
   );

   const onTypeChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
         const diceId = e.target.name;
         const name = e.target.value as TDiceType;
         dispatch(setDiceType({ id, dice: { id: diceId, name } }));
      },
      [id],
   );
   const onDamageTypeChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
         const diceId = e.target.name;
         const damageType = e.target.value as keyof typeof DamageType;
         dispatch(setDamageType({ id, dice: { id: diceId, damageType } }));
      },
      [id],
   );
   const onDamageEfficiencyChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
         const diceId = e.target.name;
         const damageEfficiency = e.target.value as keyof typeof DamageEfficiency;

         dispatch(setDamageEfficiency({ id, dice: { id: diceId, damageEfficiency } }));
      },
      [id],
   );
   const onHasFitChange = useCallback(
      (diceId: string) => {
         dispatch(setDamageFit({ id, diceId }));
      },
      [id],
   );

   const createField = useCallback(() => dispatch(addDice(id)), [dispatch, addDice, id]);
   const removeField = useCallback(
      (diceId: string) => dispatch(removeDice({ id, diceId })),
      [dispatch, id, removeDice],
   );

   return (
      <DamageFieldsUI
         fieldList={fieldList}
         options={{ typeOptions, damageTypeOptions, damageEfficiencyOptions }}
         change={{
            onFieldChange,
            onDamageModifierChange,
            onTypeChange,
            onDamageTypeChange,
            onDamageEfficiencyChange,
            onHasFitChange,
         }}
         createField={createField}
         removeField={removeField}
      />
   );
});
