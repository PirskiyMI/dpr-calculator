import { FC, KeyboardEvent } from 'react';
import styles from './styles.module.scss';

interface IProps {
   checked: boolean;
   onChange: () => void;
}

export const Checkbox: FC<IProps> = ({ checked, onChange }) => {
   const enterHandle = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onChange();
   };

   return (
      <>
         <input
            type="checkbox"
            className={styles.input}
            name="ch1"
            id="ch1"
            checked={checked}
            onKeyDown={enterHandle}
         />
         <div className={styles.checkbox} onClick={onChange}>
            <div className={styles.checkbox__flag} />
         </div>
      </>
   );
};
