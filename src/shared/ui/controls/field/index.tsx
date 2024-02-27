import { ChangeEvent, FC, memo } from 'react';
import styles from './styles.module.scss';

interface IProps {
   value: string;
   placeholder?: string;
   maxLength?: number;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
   controls?: {
      increment: () => void;
      decrement: () => void;
   };
}

export const Field: FC<IProps> = memo(
   ({ value, placeholder = 'Значение', maxLength, onChange, controls }) => {
      return (
         <div className={styles.field}>
            <input
               type="text"
               value={String(value)}
               onChange={onChange}
               maxLength={maxLength}
               className={styles.field__input}
            />
            <div
               className={`${
                  value
                     ? `${styles.field__placeholder} ${styles.field__placeholder_active}`
                     : styles.field__placeholder
               }`}>
               {placeholder}
            </div>
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
