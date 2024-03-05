import { ChangeEvent, useCallback, useMemo } from 'react';
import { IOption, useAppDispatch, useAppSelector } from 'src/shared/lib';
import { dicesSelector } from '../model/selectors';
import { TDiceType } from '../types';
import { damageActions } from '..';
import {
   DamageEfficiency,
   DamageEfficiencyOnRu,
   DamageType,
   DamageTypeOnRu,
   DiceName,
} from '../constants';
import { DamageFieldsUI } from './ui';

export const DamageFields = () => {
   const dispatch = useAppDispatch();
   const fieldList = useAppSelector(dicesSelector);
   const { setDices, setDiceType, addDice, removeDice, setDamageType, setDamageEfficiency } =
      damageActions;

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
         dispatch(setDices({ count, id: e.target.id }));
      },
      [dispatch, setDices],
   );
   const onTypeChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
         const id = e.target.name;
         const name = e.target.value as TDiceType;
         dispatch(setDiceType({ id, name }));
      },
      [dispatch, setDiceType],
   );
   const onDamageTypeChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
         const id = e.target.name;
         const damageType = e.target.value as keyof typeof DamageType;
         dispatch(setDamageType({ id, damageType }));
      },
      [dispatch, setDamageType],
   );
   const onDamageEfficiencyChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
         const id = e.target.name;
         const damageEfficiency = e.target.value as keyof typeof DamageEfficiency;

         dispatch(setDamageEfficiency({ id, damageEfficiency }));
      },
      [dispatch, setDamageEfficiency],
   );

   const createField = useCallback(() => dispatch(addDice()), [dispatch, addDice]);
   const removeField = useCallback(
      (id: string) => dispatch(removeDice(id)),
      [dispatch, removeDice],
   );

   return (
      <DamageFieldsUI
         fieldList={fieldList}
         options={{ typeOptions, damageTypeOptions, damageEfficiencyOptions }}
         change={{ onFieldChange, onTypeChange, onDamageTypeChange, onDamageEfficiencyChange }}
         createField={createField}
         removeField={removeField}
      />
   );
};
