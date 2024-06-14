import { FC } from 'react';

import DiceIcon from 'shared/assets/icons/dice-icon.svg?react';
import { AddThrow } from 'features/add-throw';
import { ThrowList } from 'widgets/throw-list';

import styles from './CalculatorPage.module.scss';

export const CalculatorPage: FC = () => {
   return (
      <div className={styles.calculator}>
         <div className={styles.calculator__title}>
            <DiceIcon className={styles.calculator__dice} />
            <h1>D&D DPR Калькулятор</h1>
         </div>
         <div className={styles.calculator__button}>
            <AddThrow />
         </div>
         <ThrowList />
      </div>
   );
};
