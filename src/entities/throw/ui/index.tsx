import { FC, ReactNode, memo } from 'react';
import styles from './styles.module.scss';

interface IProps {
   button: ReactNode;
   deleteButton: ReactNode;
   controls: {
      main: ReactNode;
      select: ReactNode;
      fields: ReactNode;
   };
   params: {
      probabilityOfMiss: number;
      probabilityOfHit: number;
      probabilityOfCriticalHit: number;
      damagePerRound: number;
   };
}

export const Throw: FC<IProps> = memo(
   ({
      button,
      deleteButton,
      controls: { main, select, fields },
      params: { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit, damagePerRound },
   }) => {
      return (
         <div className={styles.throw}>
            {deleteButton}
            <div className={styles.throw__wrapper}>
               <div className={styles.controls}>
                  {main}
                  {select}
                  {fields}
               </div>
               <div className={styles.output}>
                  <div className={styles.output__wrapper}>
                     {button}
                     <ul className={styles.output__list}>
                        <li>Промах: {(probabilityOfMiss * 100).toFixed(2)}%</li>
                        <li>Попадание: {(probabilityOfHit * 100).toFixed(2)}%</li>
                        <li>
                           Критическое попадание: {(probabilityOfCriticalHit * 100).toFixed(2)}%
                        </li>
                        <li>Средний урон: {damagePerRound.toFixed(2)}</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      );
   },
);
