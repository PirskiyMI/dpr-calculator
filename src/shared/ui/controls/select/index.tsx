import { FC, memo } from 'react';
import styles from './styles.module.scss';

interface IProps {
   items: string[];
   currentValue: string;
   onChange: (arg: string) => void;
}

interface ISelectItemProps {
   label: string;
   selected: boolean;
   onChange: (arg: string) => void;
}

export const Select: FC<IProps> = memo(({ items, currentValue, onChange }) => {
   return (
      <ul className={styles.select}>
         {items.map((el) => (
            <SelectItem key={el} label={el} onChange={onChange} selected={el === currentValue} />
         ))}
      </ul>
   );
});

const SelectItem: FC<ISelectItemProps> = ({ label, onChange, selected }) => {
   const classes = selected
      ? `${styles.select__item} ${styles.select__item_active}`
      : styles.select__item;

   return (
      <li className={classes} onClick={() => onChange(label)}>
         {label}
      </li>
   );
};
