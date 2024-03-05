import { ChangeEvent, FC, memo, useCallback } from 'react';
import { Dropdown } from 'src/shared/ui/controls/dropdown';
import { Field } from 'src/shared/ui/controls/field';
import { Button } from 'src/shared/ui/button';
import { IOption } from 'src/shared/lib';
import { IDice } from '../types';

interface IProps extends IDice {
   typeOptions: IOption[];
   damageTypeOptions: IOption[];
   damageEfficiencyOptions: IOption[];
   onFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
   onTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   onDamageTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   onDamageEfficiencyChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   removeField: (id: string) => void;
}

export const DamageField: FC<IProps> = memo(
   ({
      name,
      count,
      id,
      damageType,
      damageEfficiency,
      typeOptions,
      damageTypeOptions,
      damageEfficiencyOptions,
      onFieldChange,
      onTypeChange,
      onDamageTypeChange,
      onDamageEfficiencyChange,
      removeField,
   }) => {
      const handleRemoveField = useCallback(() => removeField(id), [id, removeField]);
      return (
         <>
            <Field
               id={id}
               name={name}
               placeholder={name}
               value={count ? String(count) : ''}
               maxLength={2}
               onChange={onFieldChange}
            />
            <Dropdown name={id} defaultValue={name} options={typeOptions} onChange={onTypeChange} />
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
            <Button type="dashed" onClick={handleRemoveField}>
               Удалить
            </Button>
         </>
      );
   },
);
