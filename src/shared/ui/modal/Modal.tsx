import { FC, ReactNode } from 'react';

import styles from './Modal.module.scss';

interface IProps {
   children: ReactNode;
   closeModal: () => void;
}

export const Modal: FC<IProps> = ({ children, closeModal }) => {
   return (
      <div className={styles.modal} onClick={closeModal}>
         <div className={styles.modal__body} onClick={(e) => e.stopPropagation()}>
            {children}
         </div>
      </div>
   );
};
