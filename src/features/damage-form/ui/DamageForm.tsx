import { ChangeEvent, FC, memo, useCallback } from 'react';

import { Dropdown } from 'shared/ui/controls/dropdown';
import { Field } from 'shared/ui/controls/field';
import { MyButton } from 'shared/ui/controls/my-button';
import { IOption, useAppDispatch } from 'shared/lib';
import { DamageEfficiency, DamageType, IDice, TDiceType, damageActions } from 'entities/damage';

import styles from './DamageForm.module.scss';

interface IProps extends IDice {
   parentId: string;
   typeOptions: IOption[];
   damageTypeOptions: IOption[];
   damageEfficiencyOptions: IOption[];
}

export const DamageForm: FC<IProps> = memo(
   ({
      parentId,
      name,
      count,
      id,
      hasDamageFit,
      damageModifier,
      damageType,
      damageEfficiency,
      typeOptions,
      damageTypeOptions,
      damageEfficiencyOptions,
   }) => {
      const dispatch = useAppDispatch();

      const {
         setDices,
         setDiceType,
         removeDice,
         setDamageModifier,
         setDamageType,
         setDamageEfficiency,
         setDamageFit,
      } = damageActions;

      const removeField = useCallback(
         () => dispatch(removeDice({ id: parentId, diceId: id })),
         [dispatch, id, parentId, removeDice],
      );
      const onHasFitChange = useCallback(() => {
         dispatch(setDamageFit({ id: parentId, diceId: id }));
      }, [dispatch, id, parentId, setDamageFit]);

      const onFieldChange = useCallback(
         (e: ChangeEvent<HTMLInputElement>) => {
            const count = +e.target.value;
            dispatch(setDices({ id: parentId, dice: { id, count } }));
         },
         [dispatch, id, parentId, setDices],
      );
      const onDamageModifierChange = useCallback(
         (e: ChangeEvent<HTMLInputElement>) => {
            const damageModifier = +e.target.value;
            dispatch(setDamageModifier({ id: parentId, dice: { id, damageModifier } }));
         },
         [dispatch, id, parentId, setDamageModifier],
      );

      const onTypeChange = useCallback(
         (e: ChangeEvent<HTMLSelectElement>) => {
            const name = e.target.value as TDiceType;
            dispatch(setDiceType({ id: parentId, dice: { id, name } }));
         },
         [dispatch, id, parentId, setDiceType],
      );
      const onDamageTypeChange = useCallback(
         (e: ChangeEvent<HTMLSelectElement>) => {
            const damageType = e.target.value as keyof typeof DamageType;
            dispatch(setDamageType({ id: parentId, dice: { id, damageType } }));
         },
         [dispatch, id, parentId, setDamageType],
      );
      const onDamageEfficiencyChange = useCallback(
         (e: ChangeEvent<HTMLSelectElement>) => {
            const damageEfficiency = e.target.value as keyof typeof DamageEfficiency;
            dispatch(setDamageEfficiency({ id: parentId, dice: { id, damageEfficiency } }));
         },
         [dispatch, id, parentId, setDamageEfficiency],
      );

      return (
         <form className={styles.damageForm}>
            <div className={styles.damageForm__fields}>
               <Field
                  name={id}
                  placeholder={'Кол-во'}
                  value={count ? String(count) : ''}
                  maxLength={2}
                  onChange={onFieldChange}
               />
               <Field
                  name={id}
                  placeholder={'Мод-ор'}
                  value={damageModifier ? String(damageModifier) : ''}
                  maxLength={2}
                  onChange={onDamageModifierChange}
               />
            </div>
            <Dropdown
               name={id}
               defaultValue={name.toUpperCase()}
               options={typeOptions}
               onChange={onTypeChange}
            />
            <Dropdown
               name={id}
               defaultValue={damageType.toUpperCase()}
               options={damageTypeOptions}
               onChange={onDamageTypeChange}
            />
            <Dropdown
               name={id}
               defaultValue={damageEfficiency.toUpperCase()}
               options={damageEfficiencyOptions}
               onChange={onDamageEfficiencyChange}
            />
            <div
               className={
                  hasDamageFit
                     ? `${styles.damageForm__checkbox} ${styles.damageForm__checkbox_active}`
                     : styles.damageForm__checkbox
               }
               onClick={onHasFitChange}>
               Мастер большого оружия / Меткий стрелок
            </div>
            <MyButton uiType="secondary" type="button" onClick={removeField}>
               Удалить
            </MyButton>
         </form>
      );
   },
);
