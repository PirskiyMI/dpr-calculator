import { FC, memo } from 'react';

import styles from './MySelect.module.scss';

interface ISelect {
   title: string;
   value: string;
}

interface IProps {
   items: ISelect[];
   currentValue: string;
   onChange: (arg: string) => void;
}

interface ISelectItemProps {
   title: string;
   value: string;
   selected: boolean;
   onChange: (arg: string) => void;
}

export const MySelect: FC<IProps> = memo(({ items, currentValue, onChange }) => {
   return (
      <ul className={styles.select}>
         {items.map(({ title, value }) => (
            <SelectItem
               key={value}
               value={value}
               title={title}
               onChange={onChange}
               selected={value === currentValue}
            />
         ))}
      </ul>
   );
});

const SelectItem: FC<ISelectItemProps> = ({ title, value, onChange, selected }) => {
   const classes = selected
      ? `${styles.select__item} ${styles.select__item_active}`
      : styles.select__item;

   return (
      <li className={classes} onClick={() => onChange(value)}>
         {title}
      </li>
   );
};
