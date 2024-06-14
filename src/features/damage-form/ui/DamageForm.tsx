import { FC, useState } from 'react';

import { MyButton } from 'shared/ui/controls/my-button';

import { DamageFormBody } from './DamageFormBody';
import styles from './DamageForm.module.scss';

interface IProps {
   id: string;
}

export const DamageForm: FC<IProps> = ({ id }) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const toggleIsOpen = (isOpen: boolean) => () => {
      return setIsOpen(isOpen);
   };

   return (
      <div className={styles.damageForm}>
         <MyButton
            uiType="secondary"
            onClick={toggleIsOpen(!isOpen)}
            onMouseDown={(e) => e.stopPropagation()}
            className={styles.damageForm__button}>
            <span className={styles.damageForm__dot}>.</span>
         </MyButton>
         {isOpen && <DamageFormBody id={id} closeDropdown={toggleIsOpen(false)} />}
      </div>
   );
};
