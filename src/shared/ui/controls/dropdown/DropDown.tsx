import { ChangeEvent, FC, memo } from 'react';

import { IOption } from 'shared/lib';

import styles from './DropDown.module.scss';

interface IProps {
   defaultValue: string;
   options: IOption[];
   name?: string;
   onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown: FC<IProps> = memo(({ defaultValue, options, name, onChange }) => {
   return (
      <select
         defaultValue={defaultValue}
         onChange={onChange}
         name={name}
         className={styles.dropdown}>
         {options.map((el) => (
            <option key={el.value} value={el.value}>
               {el.title}
            </option>
         ))}
      </select>
   );
});
