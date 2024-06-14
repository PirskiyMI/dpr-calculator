import { FC } from 'react';

import DiceIcon from 'shared/assets/icons/cross-icon.svg?react';

import styles from './TechnicalCalculatorPage.module.scss';

export const TechnicalCalculatorPage: FC = () => {
   return (
      <div className={styles.page}>
         <div className={styles.page__title}>
            <DiceIcon className={styles.page__dice} />
            <h1>D&D DPR a</h1>
         </div>
      </div>
   );
};
