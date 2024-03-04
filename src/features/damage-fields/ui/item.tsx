import { ChangeEvent, FC } from 'react';
import { Dropdown } from 'src/shared/ui/controls/dropdown';
import { Field } from 'src/shared/ui/controls/field';
import { IDice } from '..';

interface IProps extends IDice {
   options: string[];
   onFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
   onTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const DamageField: FC<IProps> = ({
   name,
   count,
   id,
   options,
   onFieldChange,
   onTypeChange,
}) => {
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
         <Dropdown defaultValue={name} name={id} options={options} onChange={onTypeChange} />
      </>
   );
};
