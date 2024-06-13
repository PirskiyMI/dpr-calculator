import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import CrossIcon from '../../assets/icons/cross-icon.svg?react';

import styles from './Modal.module.scss';

const modalNode = document.getElementById('modal')!;

interface IProps {
   children: ReactNode;
   closeModal: () => void;
}

export const Modal: FC<IProps> = ({ children, closeModal }) => {
   useEffect(() => {
      document.body.classList.add('block');
      return () => {
         document.body.classList.remove('block');
      };
   }, []);

   return createPortal(
      <div className={styles.modal} onClick={closeModal}>
         <div className={styles.modal__body} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className={styles.modal__button}>
               <CrossIcon className={styles.modal__cross} />
            </button>
            {children}
         </div>
      </div>,
      modalNode,
   );
};
