import { FC, KeyboardEvent, memo } from 'react';
import styles from './styles.module.scss';

interface IProps {
   checked: boolean;
   onChange: () => void;
}

export const Checkbox: FC<IProps> = memo(({ checked, onChange }) => {
   const enterHandle = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onChange();
   };

   return (
      <>
         <input
            type="checkbox"
            className={styles.input}
            checked={checked}
            onKeyDown={enterHandle}
         />
         <div className={styles.checkbox} onClick={onChange}>
            <div className={styles.checkbox__flag} />
         </div>
      </>
   );
});
