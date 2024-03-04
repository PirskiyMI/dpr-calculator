import { ChangeEvent, FC, memo } from 'react';

interface IProps {
   defaultValue: string;
   options: string[];
   name?: string;
   onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown: FC<IProps> = memo(({ defaultValue, options, name, onChange }) => {
   return (
      <select defaultValue={defaultValue} onChange={onChange} name={name}>
         {options.map((el) => (
            <option key={el} value={el}>
               {el}
            </option>
         ))}
      </select>
   );
});
