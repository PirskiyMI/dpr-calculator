import { FC, KeyboardEvent, memo } from 'react';
import styles from './styles.module.scss';

interface IProps {
   checked: boolean;
   label?: string;
   disabled?: boolean;
   onChange: () => void;
}

export const Checkbox: FC<IProps> = memo(({ checked, label, disabled = false, onChange }) => {
   const enterHandle = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') onChange();
   };

   return (
      <label className={disabled ? styles.disabled : undefined}>
         <input
            type="checkbox"
            className={styles.input}
            checked={checked}
            onKeyDown={enterHandle}
            onChange={onChange}
            disabled={disabled}
         />
         <div className={styles.wrapper}>
            <div className={styles.checkbox}>
               <div className={styles.checkbox__flag} />
            </div>
            {label && <span className={styles.label}>{label}</span>}
         </div>
      </label>
   );
});
