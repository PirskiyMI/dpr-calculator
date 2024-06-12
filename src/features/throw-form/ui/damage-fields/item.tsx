import { ChangeEvent, FC, memo, useCallback } from 'react';

import { Dropdown } from 'shared/ui/controls/dropdown';
import { Field } from 'shared/ui/controls/field';
import { MyButton } from 'shared/ui/controls/my-button';
import { IOption } from 'shared/lib';

import { IDice } from '../../lib/types/dice-types';

import styles from './styles.module.scss';

export interface IChangeActions {
   onFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
   onDamageModifierChange: (e: ChangeEvent<HTMLInputElement>) => void;
   onTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   onDamageTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   onDamageEfficiencyChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   onHasFitChange: (id: string) => void;
}

interface IProps extends IDice {
   typeOptions: IOption[];
   damageTypeOptions: IOption[];
   damageEfficiencyOptions: IOption[];
   changeActions: IChangeActions;
   removeField: (id: string) => void;
}

export const DamageField: FC<IProps> = memo(
   ({
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
      removeField,
      changeActions: {
         onFieldChange,
         onDamageModifierChange,
         onTypeChange,
         onDamageTypeChange,
         onDamageEfficiencyChange,
         onHasFitChange,
      },
   }) => {
      const handleRemoveField = useCallback(() => removeField(id), []);
      const handleHasFitChange = useCallback(() => onHasFitChange(id), []);
      return (
         <>
            <div className={styles.inputs}>
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
                  hasDamageFit ? `${styles.checkbox} ${styles.checkbox_active}` : styles.checkbox
               }
               onClick={handleHasFitChange}>
               Мастер большого оружия / Меткий стрелок
            </div>
            <MyButton uiType="secondary" onClick={handleRemoveField}>
               Удалить
            </MyButton>
         </>
      );
   },
);
