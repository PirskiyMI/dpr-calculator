import { ChangeEvent, FC, memo, useCallback } from 'react';
import { Dropdown } from 'src/shared/ui/controls/dropdown';
import { Field } from 'src/shared/ui/controls/field';
import { Button } from 'src/shared/ui/button';
import { IOption } from 'src/shared/lib';
import { IDice } from '../types';
import styles from './styles.module.scss';

interface IProps extends IDice {
   typeOptions: IOption[];
   damageTypeOptions: IOption[];
   damageEfficiencyOptions: IOption[];
   onFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
   onDamageModifierChange: (e: ChangeEvent<HTMLInputElement>) => void;
   onTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   onDamageTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   onDamageEfficiencyChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   onHasFitChange: (id: string) => void;
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
      onFieldChange,
      onDamageModifierChange,
      onTypeChange,
      onDamageTypeChange,
      onDamageEfficiencyChange,
      onHasFitChange,
      removeField,
   }) => {
      const handleRemoveField = useCallback(() => removeField(id), [id, removeField]);
      return (
         <>
            <div className={styles.inputs}>
               <Field
                  id={id}
                  name={name}
                  placeholder={'Кол-во'}
                  value={count ? String(count) : ''}
                  maxLength={2}
                  onChange={onFieldChange}
               />
               <Field
                  id={id}
                  name={name}
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
               onClick={() => onHasFitChange(id)}>
               Мастер большого оружия / Меткий стрелок
            </div>
            <Button type="dashed" shape="round" onClick={handleRemoveField}>
               Удалить
            </Button>
         </>
      );
   },
);
