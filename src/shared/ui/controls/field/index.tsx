import { ChangeEvent, FC, memo } from 'react';
import styles from './styles.module.scss';

interface IProps {
   id?: string;
   value: string;
   name?: string;
   placeholder?: string;
   maxLength?: number;
   onChange?: (e: ChangeEvent<HTMLInputElement>, ...args: unknown[]) => void;
   controls?: {
      increment: () => void;
      decrement: () => void;
   };
}

export const Field: FC<IProps> = memo(
   ({ id, value, name, placeholder = 'Значение', maxLength, onChange, controls }) => {
      return (
         <div className={styles.field}>
            <div
               className={`${
                  value
                     ? `${styles.field__placeholder} ${styles.field__placeholder_active}`
                     : styles.field__placeholder
               }`}>
               {placeholder}
            </div>
            <input
               id={id}
               type="text"
               value={value}
               name={name}
               onChange={onChange}
               maxLength={maxLength}
               className={styles.field__input}
            />
            {controls && (
               <div className={styles.field__controls}>
                  <button onClick={controls.increment} className={styles.field__button}>
                     ⯅
                  </button>
                  <button onClick={controls.decrement} className={styles.field__button}>
                     ⯆
                  </button>
               </div>
            )}
         </div>
      );
   },
);
