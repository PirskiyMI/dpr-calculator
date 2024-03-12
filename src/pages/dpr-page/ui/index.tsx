import { AddThrow } from 'src/features/throw-form';
import { ThrowList } from 'src/widgets/throw-list';

import styles from './styles.module.scss';

export const CalculatorPage = () => {
   return (
      <div className={styles.calculator}>
         <div className={styles.calculator__button}>
            <AddThrow />
         </div>
         <ThrowList />
      </div>
   );
};
