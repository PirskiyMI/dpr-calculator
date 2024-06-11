import { FC, ReactNode, memo, useState } from 'react';

import { Button } from 'src/shared/ui/controls/button';

import { getPercentage } from '../lib/helpers/get-percentage';
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
      controls: { main, select, fields },
      params: { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit, damagePerRound },
   }) => {
      const missPercentage = getPercentage(probabilityOfMiss);
      const hitPercentage = getPercentage(probabilityOfHit);
      const criticalHitPercentage = getPercentage(probabilityOfCriticalHit);

      return (
         <div className={styles.throw}>
            <ThrowActionsMenu />
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
                        <li>Промах: {missPercentage}%</li>
                        <li>Попадание: {hitPercentage}%</li>
                        <li>Критическое попадание: {criticalHitPercentage}%</li>
                        <li>Средний урон: {damagePerRound.toFixed(2)}</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      );
   },
);

const ThrowActionsMenu = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const toggleOpen = () => setIsOpen(!isOpen);

   return (
      <div className={styles.menu}>
         <Button onClick={toggleOpen} className={styles.menu__button}>
            <span className={styles.menu__dot}>.</span>
         </Button>
         {isOpen && (
            <div className={styles.menu__dropdown}>
               <div>Копировать</div>
               <div>Удалить</div>
            </div>
         )}
      </div>
   );
};
