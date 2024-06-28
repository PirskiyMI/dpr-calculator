import { FC, KeyboardEvent, memo } from 'react';

import styles from './MyCheckbox.module.scss';

interface IProps {
   checked: boolean;
   name?: string;
   label?: string;
   disabled?: boolean;
   onChange: () => void;
}

export const MyCheckbox: FC<IProps> = memo(({ checked, name, label, disabled = false, onChange }) => {
   const enterHandle = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') onChange();
   };

   return (
      <label className={disabled ? styles.disabled : undefined}>
         <input
            name={name}
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
