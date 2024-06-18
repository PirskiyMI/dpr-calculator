import { FC } from 'react';

import { useAppSelector } from 'shared/lib';
import { getThrowList } from 'entities/throw';

import styles from './ThrowList.module.scss';
import { ThrowListItem } from './ThrowListItem';

export const ThrowList: FC = () => {
   const throwList = useAppSelector(getThrowList);

   return (
      <ul className={styles.list}>
         {throwList.map((el) => (
            <li key={el} className={styles.list__item}>
               <ThrowListItem id={el} />
            </li>
         ))}
      </ul>
   );
};
