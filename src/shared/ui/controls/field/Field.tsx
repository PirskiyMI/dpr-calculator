import { ChangeEvent, FC, memo } from 'react';

import styles from './Field.module.scss';

interface IProps {
   id?: string;
   value: string;
   name?: string;
   placeholder?: string;
   maxLength?: number;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
   onBlur?: () => void;
}

export const Field: FC<IProps> = memo(
   ({ id, value, name, placeholder = 'Значение', maxLength, onChange, onBlur }) => {
      return (
         <label className={styles.field}>
            <span className={styles.field__label}>{placeholder}</span>
            <input
               id={id}
               type="text"
               value={value}
               name={name}
               onChange={onChange}
               onBlur={onBlur}
               maxLength={maxLength}
               className={styles.field__input}
            />
         </label>
      );
   },
);
