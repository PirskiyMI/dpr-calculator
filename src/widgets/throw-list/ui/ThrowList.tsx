import { FC } from 'react';

import { useAppSelector } from 'shared/lib';
import { getThrowList } from 'entities/throw';
import { ThrowForm } from 'features/throw-form';

import styles from './ThrowList.module.scss';

export const ThrowList: FC = () => {
   const throwList = useAppSelector(getThrowList);
   return (
      <ul className={styles.list}>
         {throwList.map((el) => (
            <li key={el} className={styles.list__item}>
               <ThrowForm id={el} />
            </li>
         ))}
      </ul>
   );
};
