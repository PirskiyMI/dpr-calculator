import { ChangeEvent, FC } from 'react';

interface IProps {
   defaultValue: string;
   options: string[];
   onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown: FC<IProps> = ({ defaultValue, options, onChange }) => {
   return (
      <select defaultValue={defaultValue} onChange={onChange}>
         {options.map((el) => (
            <option key={el} value={el}>
               {el}
            </option>
         ))}
      </select>
   );
};
