import { ChangeEvent, memo, useCallback } from 'react';

import { IPropsId, useAppDispatch, useAppSelector } from 'shared/lib';
import {
   getDicesSelector,
   damageActions,
   DamageEfficiency,
   DamageType,
   DiceName,
   TDiceType,
   DamageTypeOnRu,
   DamageEfficiencyOnRu,
} from 'entities/damage';

import { getOptionList } from '../lib/helpers/getOptionList';
import { DamageForm } from './DamageForm';

export const DamageFormContainer = memo(({ id }: IPropsId) => {
   const dispatch = useAppDispatch();
   const fieldList = useAppSelector((state) => getDicesSelector(state, id));
   const {
      setDices,
      setDiceType,
      removeDice,
      setDamageModifier,
      setDamageType,
      setDamageEfficiency,
      setDamageFit,
   } = damageActions;

   const typeOptions = getOptionList(DiceName, DiceName);
   const damageTypeOptions = getOptionList(DamageType, DamageTypeOnRu);
   const damageEfficiencyOptions = getOptionList(DamageEfficiency, DamageEfficiencyOnRu);

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
      [dispatch, id, setDiceType],
   );
   const onDamageTypeChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
         const diceId = e.target.name;
         const damageType = e.target.value as keyof typeof DamageType;
         dispatch(setDamageType({ id, dice: { id: diceId, damageType } }));
      },
      [dispatch, id, setDamageType],
   );
   const onDamageEfficiencyChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
         const diceId = e.target.name;
         const damageEfficiency = e.target.value as keyof typeof DamageEfficiency;

         dispatch(setDamageEfficiency({ id, dice: { id: diceId, damageEfficiency } }));
      },
      [dispatch, id, setDamageEfficiency],
   );
   const onHasFitChange = useCallback(
      (diceId: string) => {
         dispatch(setDamageFit({ id, diceId }));
      },
      [dispatch, id, setDamageFit],
   );

   const removeField = useCallback(
      (diceId: string) => dispatch(removeDice({ id, diceId })),
      [dispatch, id, removeDice],
   );

   return (
      <DamageForm
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
         removeField={removeField}
      />
   );
});
