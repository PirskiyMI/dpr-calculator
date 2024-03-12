import { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

interface IProps {
   controls: {
      main: ReactNode;
      select: ReactNode;
      fields: ReactNode;
   };
   output: {
      button: ReactNode;
      params: {
         probabilityOfMiss: number;
         probabilityOfHit: number;
         probabilityOfCriticalHit: number;
         damagePerRound: number;
      };
   };
}

export const Throw: FC<IProps> = ({
   controls: { main, select, fields },
   output: {
      button,
      params: { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit, damagePerRound },
   },
}) => {
   return (
      <>
         <div className={styles.controls}>
            {main}
            {select}
            {fields}
         </div>
         <div className={styles.output}>
            <div className={styles.output__wrapper}>
               {button}
               <ul className={styles.form__list}>
                  <li>Промах: {(probabilityOfMiss * 100).toFixed(2)}%</li>
                  <li>Попадание: {(probabilityOfHit * 100).toFixed(2)}%</li>
                  <li>Критическое попадание: {(probabilityOfCriticalHit * 100).toFixed(2)}%</li>
                  <li>Средний урон: {damagePerRound.toFixed(2)}</li>
               </ul>
            </div>
         </div>
      </>
   );
};
