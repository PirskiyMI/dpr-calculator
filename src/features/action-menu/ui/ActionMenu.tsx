import { FC, useState } from 'react';

import { MyButton } from 'shared/ui/controls/my-button';

import { ActionMenuBody } from './ActionMenuBody';
import styles from './ActionMenu.module.scss';

interface IProps {
   id: string;
}

export const ActionMenu: FC<IProps> = ({ id }) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const toggleIsOpen = (isOpen: boolean) => () => {
      return setIsOpen(isOpen);
   };

   return (
      <div className={styles.actionMenu}>
         <MyButton
            uiType="secondary"
            onClick={toggleIsOpen(!isOpen)}
            onMouseDown={(e) => e.stopPropagation()}
            className={styles.actionMenu__button}>
            <span className={styles.actionMenu__dot}>.</span>
         </MyButton>
         {isOpen && <ActionMenuBody id={id} closeDropdown={toggleIsOpen(false)} />}
      </div>
   );
};
