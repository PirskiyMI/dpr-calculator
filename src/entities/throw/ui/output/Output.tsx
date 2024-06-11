import { FC } from 'react';

import styles from './Output.module.scss';

interface IProps {
   title: string;
   value: string;
   isProbability?: boolean;
}

export const Output: FC<IProps> = ({ title, value, isProbability = false }) => {
   return (
      <li className={styles.output}>
         <span className={styles.output__title}>{title}</span>
         <div className={styles.output__field}>
            {value} {isProbability ? '%' : null}
         </div>
      </li>
   );
};
