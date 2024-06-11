import { FC } from 'react';

import { AddThrow } from 'src/features/add-throw';
import { ThrowList } from 'src/widgets/throw-list';

import styles from './styles.module.scss';

export const CalculatorPage: FC = () => {
   return (
      <div className={styles.calculator}>
         <div className={styles.calculator__button}>
            <AddThrow />
         </div>
         <ThrowList />
      </div>
   );
};
