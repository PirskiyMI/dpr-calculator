import { ChangeEvent, FC, memo, useCallback } from 'react';

import { Dropdown } from 'shared/ui/controls/dropdown';
import { Field } from 'shared/ui/controls/field';
import { MyButton } from 'shared/ui/controls/my-button';
import { IOption, useAppDispatch } from 'shared/lib';
import { IDice, damageActions } from 'entities/damage';

import styles from './DamageForm.module.scss';

interface IProps {
   dice: IDice;
   parentId: string;
   typeOptions: IOption[];
   damageTypeOptions: IOption[];
   damageEfficiencyOptions: IOption[];
}

export const DamageForm: FC<IProps> = memo(
   ({ dice, parentId, typeOptions, damageTypeOptions, damageEfficiencyOptions }) => {
      const dispatch = useAppDispatch();

      const { id, name, count, damageEfficiency, damageModifier, damageType, hasDamageFit } = dice;

      const { changeDice, removeDice, setDamageFit } = damageActions;

      const removeField = useCallback(
         () => dispatch(removeDice({ id: parentId, diceId: id })),
         [dispatch, id, parentId, removeDice],
      );

      const handleDiceChange = (dice: IDice) => {
         dispatch(
            changeDice({
               id: parentId,
               dice,
            }),
         );
      };

      const handleSelectorChange =
         (changedValue: keyof IDice, isNumber: boolean = false) =>
         (e: ChangeEvent<HTMLSelectElement>) => {
            const newDice = {
               ...dice,
               [changedValue]: isNumber ? +e.target.value : e.target.value,
            };

            handleDiceChange(newDice);
         };

      const handleFieldChange =
         (changedValue: keyof IDice, isNumber: boolean = false) =>
         (e: ChangeEvent<HTMLInputElement>) => {
            const newDice = {
               ...dice,
               [changedValue]: isNumber ? +e.target.value : e.target.value,
            };

            handleDiceChange(newDice);
         };

      const toggleDamageFit = () => {
         dispatch(setDamageFit({ id: parentId, diceId: dice.id }));
      };

      return (
         <form className={styles.damageForm}>
            <div className={styles.damageForm__fields}>
               <Field
                  name={id}
                  placeholder={'Кол-во'}
                  value={count ? String(count) : ''}
                  maxLength={2}
                  onChange={handleFieldChange('count', true)}
               />
               <Field
                  name={id}
                  placeholder={'Мод-ор'}
                  value={damageModifier ? String(damageModifier) : ''}
                  maxLength={2}
                  onChange={handleFieldChange('damageModifier', true)}
               />
            </div>
            <Dropdown
               name={id}
               defaultValue={name.toUpperCase()}
               options={typeOptions}
               onChange={handleSelectorChange('name')}
            />
            <Dropdown
               name={id}
               defaultValue={damageType.toUpperCase()}
               options={damageTypeOptions}
               onChange={handleSelectorChange('damageType')}
            />
            <Dropdown
               name={id}
               defaultValue={damageEfficiency.toUpperCase()}
               options={damageEfficiencyOptions}
               onChange={handleSelectorChange('damageEfficiency')}
            />
            <div
               className={
                  hasDamageFit
                     ? `${styles.damageForm__checkbox} ${styles.damageForm__checkbox_active}`
                     : styles.damageForm__checkbox
               }
               onClick={toggleDamageFit}>
               Мастер большого оружия / Меткий стрелок
            </div>
            <MyButton uiType="secondary" type="button" onClick={removeField}>
               Удалить
            </MyButton>
         </form>
      );
   },
);
