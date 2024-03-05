import { ChangeEvent, FC, memo } from 'react';
import { IOption } from 'src/shared/lib';

interface IProps {
   defaultValue: string;
   options: IOption[];
   name?: string;
   onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown: FC<IProps> = memo(({ defaultValue, options, name, onChange }) => {
   return (
      <select defaultValue={defaultValue} onChange={onChange} name={name}>
         {options.map((el) => (
            <option key={el.value} value={el.value}>
               {el.title}
            </option>
         ))}
      </select>
   );
});
